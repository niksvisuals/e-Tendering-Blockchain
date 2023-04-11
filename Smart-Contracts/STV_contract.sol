// admin (1)  --> select 1 bid --> managers (3) --> vote yes/no on selected bid --> if(2/3 votes) bid wins else repeat process

pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract tenderFactory {
    // stores the addresses of the published tenders
    address[] private deployedTenders;
    //managers who will vote on a selected bid
    address[] private voteManagers;
    //admin - responsible for selection of one bid for further approval
    address private admin;

    constructor() public {
        admin = msg.sender;
    }

    function addVoteManager(address _address) public {
        require(
            msg.sender == admin,
            "You are not authorised to add managers."
        );
        require(voteManagers.length != 3, "Only 3 managers are allowed.");
        //flaw same address can be added as admin 3 times
        voteManagers.push(_address);
    }

    function createTender(string description) public {
        require(
            msg.sender == admin,
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

    Bid[] public bids;
    Bid[] public shortlistedBids;
    Bid public winner;
    address[] public voteManager;
    //store the vote of the manager 1 -> yes, 2->no, 0->default/initial value
    struct VoteManager {
        bool voted;
        uint256[] preferences; //
        bool isRegistered;
    }

    //uint256[] private votes;
    mapping(address => VoteManager) public voters;
    uint256 public voterLength;

    //store if particular manager has voted or not
    //mapping(address => bool) private votedOrNot;

    // This modifier is used to check if the sender of the function call is the manager.
    modifier restricted() {
        require(
            msg.sender == manager,
            "You are not authorised, only admin can access this."
        );
        _;
    }
function setWinnerBid(Bid _winner) public restricted{
    winner = _winner;
    complete = true;
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
            voters[_voteManager[i]].isRegistered = true;
        }
    }
    //first shortlist the bids and then only cast vote 

    //can be set only by admin/manager
    function setShortlistedBids(Bid[] memory _bids) public restricted {
         require(!complete, "Tender results have been declared");
           require(
            shortlistedBids.length ==0,
            "Bids have already been shortlisted."
        );
        for (uint256 i = 0; i < _bids.length; i++) {
            shortlistedBids.push(_bids[i]);
        }
    }

     function castVote(uint256[] memory _preferences) public {
         require(voters[msg.sender].isRegistered, "You are not allowed to vote.");
        require(!voters[msg.sender].voted, "You have already voted.");
        require(
            _preferences.length == shortlistedBids.length,
            "Invalid number of preferences."
        );
        // uint256[] memory tmp = new uint256[](shortlistedBids.length);
        // for (uint256 i = 0; i < shortlistedBids.length; i++) {
            // tmp[i] = _preferences[i];
            // shortlised bids -> A D E Q W
            // preferences ->     2 1 5 4 3
            //index ->          0 1 2 3 4
            // votes ->         1 0 4 3 2
        // }
        voters[msg.sender].preferences = _preferences;
        voters[msg.sender].voted = true;

    }

    function getShortlistedBidsCount()public view returns(uint){
        return shortlistedBids.length;
    }

    function getPreferencesList(address voter) public view returns (uint[]){
        require(voters[voter].voted, "This address has not voted yet.");
        return voters[voter].preferences;
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
/*     function selectedBidFun(uint256 _index) public restricted {
        require(!complete, "Tender results have been declared");
        require(
            selectedBid.bidder == address(0),
            "Selected Bid is already set."
        );
        selectedBid = bids[_index];
    } */

    //check if the bid is selected by admin only then show the option to vote in frontend
    function areBidsShortListed() public view returns (bool) {
        return shortlistedBids.length !=0;
    }

    //managers cast their vote for the selected bid
/*     function voteByManager(uint256 _vote) public returns (bool) {
        //voting not allowed if bid is not selected in the first place
         require(
            shortlistedBids.length != 0,
            "Bids have not been shortlisted."
        );
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
    } */


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
