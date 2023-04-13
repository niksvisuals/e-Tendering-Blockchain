window.ethereum.enable()

//factory tender contract address and contract abi
var fcontract_address = '0xd481543BBD94cC8b668BB8ef46DEE01F4ac310CE'

var fcontract_abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "addVoteManager",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "description",
                "type": "string"
            }
        ],
        "name": "createTender",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getDeployedTenders",
        "outputs": [
            {
                "name": "",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

// contract Tender abi
var contract_abi = [
    {
        "constant": true,
        "inputs": [],
        "name": "verifyManager",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "status",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_preferences",
                "type": "uint256[]"
            }
        ],
        "name": "castVote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getBidCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "bidAmount",
                "type": "uint256"
            },
            {
                "name": "desc",
                "type": "string"
            }
        ],
        "name": "makeBid",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "bids",
        "outputs": [
            {
                "name": "bidder",
                "type": "address"
            },
            {
                "name": "bidAmount",
                "type": "uint256"
            },
            {
                "name": "bid",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "data",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "voterLength",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "setWinnerBid",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "components": [
                    {
                        "name": "bidder",
                        "type": "address"
                    },
                    {
                        "name": "bidAmount",
                        "type": "uint256"
                    },
                    {
                        "name": "bid",
                        "type": "string"
                    }
                ],
                "name": "_bids",
                "type": "tuple[]"
            }
        ],
        "name": "setShortlistedBids",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getShortlistedBidsCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "shortlistedBids",
        "outputs": [
            {
                "name": "bidder",
                "type": "address"
            },
            {
                "name": "bidAmount",
                "type": "uint256"
            },
            {
                "name": "bid",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "voters",
        "outputs": [
            {
                "name": "voted",
                "type": "bool"
            },
            {
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "voter",
                "type": "address"
            }
        ],
        "name": "getPreferencesList",
        "outputs": [
            {
                "name": "",
                "type": "uint256[]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "areBidsShortListed",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "winner",
        "outputs": [
            {
                "name": "bidder",
                "type": "address"
            },
            {
                "name": "bidAmount",
                "type": "uint256"
            },
            {
                "name": "bid",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getTenderSummary",
        "outputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getSingleBid",
        "outputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "voteManager",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "description",
                "type": "string"
            },
            {
                "name": "creator",
                "type": "address"
            },
            {
                "name": "_voteManager",
                "type": "address[]"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
]

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider)
} else {
    // set the provider you want from Web3.providers
    console.log('not detected')
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"))
}

async function shotListBidsBySorting(bids, contract) {
    // console.log('I am invoked from bids.html')
    // console.log(bids, 'bids objects passed as paramas')
    let sortedBids = structuredClone(bids)
    sortedBids.sort((a, b) => {
        return a.amt - b.amt
    })
    // console.log(sortedBids, 'sorted bids')
    //TODO change the no. of bids to splice
    sortedBids.splice(2, sortedBids.length)
    // console.log(sortedBids, 'spliced bids')
    let sortedBidsArray = []

    sortedBids.forEach(bid => {
        delete bid['id']
        // Object.values(bid)
        sortedBidsArray.push(Object.values(bid))
    })
    // console.log(sortedBidsArray, 'send to blockchain')

    let accounts22 = await web3.eth.getAccounts()
    // console.log(accounts22, 'shortlisting accounts')
    //send the shotlisted bids to blockchain
    console.info('Shortlisted Bids are follows: ')
    console.info(sortedBidsArray)
    try {
        // console.log('hope this works 11')
        contract.methods.setShortlistedBids(sortedBidsArray).send({ from: accounts22[0] }).then(res => {
            console.log('%cBids shotlisted succesfully', 'color:blue; font-size:36px', res)

        }).catch(
            error => console.log('error while settng shotlisted bids', error)
        )
        /* , (err, _result) => {
        if (err) {
            console.log(err.data.message)
        } else { */
        /* console.log('sending tuple')
        contract.setShortlistedBids.sendTransaction(sortedBidsArray, { from: web3.eth.accounts[0] }, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                // var txHash = result;
                // console.log(txHash, 'calculate winner transaction hash');
                callWhenMined(result, mined);
            }
        }) */
        // console.log('hope this works')
    }
    // })
    // }
    catch (e) {
        console.log(e)
        console.log('error while shortlisting bids')
    }
}
