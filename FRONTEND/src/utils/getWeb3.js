const Web3 = require('web3')

const loadWeb3 = async () =>{

  const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Admin",
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
				"name": "_publicKey",
				"type": "address"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"internalType": "address",
				"name": "PUBLICKEY__",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "FILEHASH__",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "IPFSHASH__",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "certifier",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "TIMESTAMP__",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTotalUser",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "TOTAL__",
				"type": "uint256"
			},
			{
				"internalType": "string[]",
				"name": "INFOLIST__",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			}
		],
		"name": "getUserInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "ID_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "NAME__",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "PUBLICKEY__",
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
				"name": "_publicKey",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_fileHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "storeData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_publicKey",
				"type": "address"
			}
		],
		"name": "storeUserInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
  //const contractAddress = '0xD792Ad8E0424f4028C0E2ca4f8D061c38Ce0C324';
 const contractAddress = '0x574D20D68e4C954b4C210DB413b6E3a2BEf5eF85' 
  var results
  var web3 = window.web3

  if(window.ethereum) {
      web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      results = {
        web3 : web3,
        initiatedContract : new web3.eth.Contract(abi,contractAddress)
      }
  }
  else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider)
      results = {
        web3 : web3,
        initiatedContract : new web3.eth.Contract(abi,contractAddress)
      }
  }
  else {
      window.alert('Non-ethereum browser detected. You should consider trying Metamask')
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      results = {
        web3 : web3,
        initiatedContract : new web3.eth.Contract(abi,contractAddress)
      }
  }
  return results
}

export default loadWeb3;



