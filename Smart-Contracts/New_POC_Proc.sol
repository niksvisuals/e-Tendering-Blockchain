// admin (1)  --> select 1 bid --> managers (3) --> vote yes/no on selected bid --> if(2/3 votes) bid wins else repeat process

pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract tenderFactory {
    // stores the addresses of the published tenders
    address[] private deployedTenders;
    //managers who will vote on a selected bid
    address[] private voteManagers;
    //admin - responsible for selection of one bid for further approval
    address private manager;

    constructor() public {
        manager = msg.sender;
    }

    function addVoteManager(address _address) public {
        require(
            msg.sender == manager,
            "You are not authorised to add managers."
        );
        require(voteManagers.length != 3, "Only 3 managers are allowed.");
        //flaw same address can be added as admin 3 times
        voteManagers.push(_address);
    }

    function createTender(string description) public {
        require(
            msg.sender == manager,
            "You are not authorised to create tender."
        );
        address newTender = new Tender(description, msg.sender, voteManagers);
        deployedTenders.push(newTender);
    }

    /* createTender is used to deploy a new instance of the 'tender' contract - 
       it accepts the requirements of the tender as argument and deploys an
       instance with the msg.sender as manager
    */

    function getDeployedTenders() public view returns (address[]) {
        return deployedTenders;
    }
    /* getDeployedTenders is a function that returns the array of deployed tenders' 
       addresses.
    */
}

contract Tender {
    /*       data => requirements of the tender 
       complete => status of whether the tender has BEEN AWARDED
    */
    bool private complete;
    string public data;
    address private manager;

    /* struct Bid is a type to hold the details of a bid made - containing
       the address of the bidder, the amount that the bid is made at, and the
       proposal of the bidder (bid).
    */
    struct Bid {
        address bidder;
        uint256 bidAmount;
        string bid;
    }

    
    Bid[] private bids;
    Bid public selectedBid;
    Bid public winner;
    address[] private voteManager;
    //store the vote of the manager 1 -> yes, 2->no, 0->default/initial value
    uint256[] private votes;
    //store if particular manager has voted or not
    mapping(address => bool) private votedOrNot;

    // This modifier is used to check if the sender of the function call is the manager.
    modifier restricted() {
        require(
            msg.sender == manager,
            "You are not authorised, only admin can access this."
        );
        _;
    }

    constructor(
        string description,
        address creator,
        address[] _voteManager
    ) public {
        manager = creator;
        data = description;
        //add vote managers form the parent contract to this contract
        for (uint256 i = 0; i < _voteManager.length; i++) {
            voteManager.push(_voteManager[i]);
        }
    }


    /* This function returns the details of the bidder, bidAmount and bid(proposal) 
    to ensure transparency in the system.
*/
    //get the details of the bids at that index
    function getSingleBid(uint256 index)
        public
        view
        returns (
            address,
            uint256,
            string
        )
    {
        return (bids[index].bidder, bids[index].bidAmount, bids[index].bid);
    }


    //allow public users to make bid for the tender
    function makeBid(uint256 bidAmount, string desc) public {
        require(!(msg.sender == manager), "Manager are not allowed to bid.");
        require(!complete, "Tender results have been declared");
        //create temporary instance of bid in memory and then push to array
        Bid memory newBid = Bid({
            bidder: msg.sender,
            bidAmount: bidAmount,
            bid: desc
        });
        bids.push(newBid);
    }

    // admin selects a bid for approval
    function selectedBidFun(uint256 _index) public restricted {
        require(!complete, "Tender results have been declared");
        require(selectedBid.bidder == address(0), "Selected Bid is already set.");
        selectedBid = bids[_index];
    }
//check if the bid is selected by admin only then show the option to vote in frontend
    function selectedBidIsSet()public view returns (bool){
        return selectedBid.bidder != address(0);
    }

    //managers cast their vote for the selected bid
    function voteByManager(uint256 _vote) public returns (bool) {
        //voting not allowed if bid is not selected in the first place
        require(selectedBid.bidder != address(0), "Selected Bid is not set");
        for (uint256 i = 0; i < voteManager.length; i++) {
            if (voteManager[i] == msg.sender) {
                require(
                    votedOrNot[msg.sender] == false,
                    "You have already voted"
                );
                votedOrNot[msg.sender] = true;
                votes.push(_vote);
                //true implies that vote has been registered
                return true;
            } 
        }
                //false implies that sender was not a manager
                return false;
    }
    //only admin can access this, to calculate the winner
    function calcWinner() public restricted {
        uint256 countOfVotes = 0;
        for (uint256 i = 0; i < voteManager.length; i++) {
            //all managers must have voted to calculate the winner
            require(votes[i] != 0, "All managers have not voted");
            //yes vote(1), count it otherwise it is discarded
            if (votes[i] == 1) {
                countOfVotes++;
            }
        }
        //if more than 50 percent then winner is declared
        if (countOfVotes >= ((voteManager.length / 2)+1)) {
            finalizeBid(selectedBid);
        } 
            //if no consensus arrived then repeat the process
        else {
//reset the selected bid
            delete selectedBid;
            //reset votes to 0
            delete votes;
            for (uint256 j = 0; j < voteManager.length; j++) {
                delete votedOrNot[voteManager[j]];
            }
        }
    }

    //voting process was a success and bid is awarded
    function finalizeBid(Bid _selectedBid) internal {
        require(!complete, "Tender results have been declared");
        // require(msg.sender == manager, "Only admin can finalise bids.");
        winner = _selectedBid;
        msg.sender.transfer(address(this).balance);
        complete = true;
    }

//function to get tender summary, returns manager address, tender description and no. of bids received
    function getTenderSummary()
        public
        view
        returns (
            address,
            string,
            uint256
        )
    {
        return (manager, data, bids.length);
    }
    //return no. of bids received
    function getBidCount() public view returns (uint256) {
        return bids.length;
    }

    function verifyManager() public view returns (bool) {
        return (manager == msg.sender);
    }

    function status() public view returns (bool) {
        return complete;
    }
}
