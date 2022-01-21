

//#region ============================   NFT  ===============================
function MintNFT() {
      if (!checkBCC()) { return }
      if (balance < 200) {
            window.alert('Your balance is not enough!')
            return
      }


      console.log('try to Mint NFT ');
      avoidCall('mintNFTBTN');

      var tokenUri = document.getElementById('NFT-mintTokenUri').value
      let myAddress = signer.getAddress()
      myContract._safeMintNFT(myAddress, tokenUri).then(()=>{
		  	  location.reload(); 
	  });

}


function BuyNFT() {
      if (!checkBCC()) { return }

      console.log('try to Buy NFT ');
      avoidCall('requestByuNft');

      var seller = document.getElementById('nft-seller').value
      var price = document.getElementById('nft-buy-price').value
      var tokenId = document.getElementById('nft-buy-TokenId').value
      myContract._buyNFTRequest(seller, price, tokenId);
}


function SellNFTAccept() {
      if (!checkBCC()) { return }

      console.log('try to Sell NFT ');
      avoidCall('acceptNFTSell');

      var buyer = document.getElementById('nft-buyer-address').value
      var price = document.getElementById('nft-price-acceptance').value
      var tokenId = document.getElementById('nft-TokenId-acceptance').value
      myContract._sellNFTAcception(buyer, tokenId, price);
}


//#endregion



//#region ============================  MINE APPLE   ============================

function MineApple() {
      if (!checkBCC()) { return }
      if (balance < 1000) {
            window.alert('Your balance is not enough!')
            return
      }


      console.log('try to Mine Apple ');
      avoidCall('mineApple');

      myContract._mineApple();
}



function BuyApple() {
      if (!checkBCC()) { return }

      console.log('try to Buy APL ');
      avoidCall('request-apl-buy');

      var seller = document.getElementById('apl-seller-address').value
      var price = document.getElementById('apl-buy-price').value
      myContract._buyAppleRequest(seller, price);
}


function SellAppleAccept() {
      if (!checkBCC()) { return }

      console.log('try to Sell APL ');
      avoidCall('accept-apl-sell');

      var buyer = document.getElementById('apl-sell-acceptance').value
      var price = document.getElementById('apl-sell-price-acceptance').value
      myContract._sellAppleAcception(buyer, price);
}


//#endregion


//#region    check for metamask
var provider;
var signer;
var hasMetamask = false;
async function checkForMetamask() {
      if (window.ethereum === undefined) {
            sendAlert('You need to install MetaMask Extention.')
      } else {
            hasMetamask = true;
            provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            signer = await provider.getSigner();
            //signer = provider.getSigner();
      }
      return Promise.resolve(true);
}

function sendAlert(msg) {
      setTimeout(() => {
            window.alert(msg);
      }, 1000)
}

//#endregion 



//#region ============================  Global   ============================

var myContract;
var isContractInit = false;
const contractAddress = "0x783fd7e04D2f755436030693c7239FBA0aEdaF6A";

function tryInitContract() {
	document.getElementById('contract-address').innerHTML = '"'+contractAddress+'"';
      myContract = new ethers.Contract(contractAddress, ABI, signer);
      isContractInit = true;
      return Promise.resolve(true);

}

//#endregion




//#region ============================  Sign In  ============================
var isSignedIn = false;
function trySingIn() {
      checkForMetamask().then(() => {
            if (hasMetamask) {
                  tryInitContract().then(() => {
                        if (isContractInit) {
                              tryGetBalance().then(() => {
                                    if (balanceFetched) {
                                          //const loginButton = document.getElementById('signInBTN')
                                          document.getElementById('signInBTN').style.display = "none";
                                          document.getElementById('userBalance').style.display = "block";
                                          printBalance();
                                          isSignedIn = true;
                                    }
                              })
                        }
                  })
            }
      }
      );

}


var balance = 0;
var balanceFetched = false;
async function tryGetBalance() {

      myContract.balanceOf(signer.getAddress()).then(function (value) {
            balance = BigInt(value._hex).toString();
            console.log('balance: ' + balance);
            printBalance();

      });

      balanceFetched = true;
      return Promise.resolve(true);

}

function printBalance() {
      setTimeout(() => {
            document.getElementById('balanceAmount').innerHTML = balance;
      }, 500)
}

//#endregion


function checkBCC() {
      if (!hasMetamask) {
            sendAlert('You need to install MetaMask Extention.');
            return false
      }
      if (!isSignedIn) {
            sendAlert('You are not signed in. please try later');
            return false
      }
      if (!isContractInit) {
            sendAlert('You are not connected to caontract. please try later');
            return false
      } else {
            return true
      }
}


//#region ============================  TRANSFER  ============================

function transfer() {
      if (!checkBCC()) { return }

      var transferDestination = document.getElementById('transfer-destination').value
      var transferAmount = document.getElementById('transfer-amount').value

      console.log('try to transfer ' + transferAmount + ' MRY to: ' + transferDestination);
      avoidCall('transferBTN');

      myContract.transfer(transferDestination, transferAmount);

}

var canTransfer = true;
function avoidCall(id) {
      document.getElementById(id).disabled = true;

      setTimeout(() => {
            document.getElementById(id).disabled = false;

      }, 80000)
}


//#endregion

function sendTest() {
      if (!checkBCC()) { return }

      var transferDestination = document.getElementById('transfer-destination').value
      var transferAmount = document.getElementById('transfer-amount').value

      console.log('request for test');
      avoidCall('reqBTN');

      myContract.giveMeTestMRY();

}

function getContractAddress() {
      if (!checkBCC()) { return }

      var transferDestination = document.getElementById('transfer-destination').value
      var transferAmount = document.getElementById('transfer-amount').value

      console.log('request for test');
      avoidCall('reqBTN');

      myContract.giveMeTestMRY();

}

// var Abal = myContract.appleBalanceOf(signer.getAddress()).then(function (value) {
//       console.log(BigInt(value._hex).toString());
// });











function test2() {
      console.log('test is ok for C I .js');
}









//#region  ABI
const ABI =
    [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "_buyAppleRequest",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "_buyNFTRequest",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_collectIrrigations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_mineApple",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_msgSender",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "_safeMintNFT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "sellPrice",
				"type": "uint256"
			}
		],
		"name": "_sellAppleAcception",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "_uriOf",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "appleBalanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "appleName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "appleSymbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "cancelNFTSell",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllAuctions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "basePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "auctionMaturity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "highestBid",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "currentOwner",
						"type": "address"
					}
				],
				"internalType": "struct MorySwapContract.Auction[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllNFTs",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSells",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct MorySwapContract.SellTicket[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getAuctionbyId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "basePrice",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "auctionMaturity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "highestBid",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "currentOwner",
						"type": "address"
					}
				],
				"internalType": "struct MorySwapContract.Auction",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDoneSells",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "timeStamp",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "wasAuction",
						"type": "bool"
					}
				],
				"internalType": "struct MorySwapContract.DoneSell[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyNFTs",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getSellById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					}
				],
				"internalType": "struct MorySwapContract.SellTicket",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "giveMeTestMRY",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "giveTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "isFreezed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "basePrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "daysH",
				"type": "uint256"
			}
		],
		"name": "listAuction",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "listNFTSell",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nftName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "nftOwnedNumberOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nftSymbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bidPrice",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "redeemAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]





//#endregion