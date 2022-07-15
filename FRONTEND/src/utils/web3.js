const Web3 = require('web3')
const DCVS = require('./DCVS.json')

const loadWeb3 = async () =>{

  var results
  var web3 = window.web3
    var abi = DCVS.abi
  if(window.ethereum) {
      web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    const networkId = await web3.eth.net.getId()
    const networkData =await  DCVS.networks[networkId]
    const contractAddress = await networkData.address
      results = {
        web3 : web3,
        initiatedContract : new web3.eth.Contract(abi,contractAddress)
      }
  }
  else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider)
      const networkId = await web3.eth.net.getId()
    const networkData =await  DCVS.networks[networkId]
    const contractAddress = await networkData.address
      results = {
        web3 : web3,
        initiatedContract : new web3.eth.Contract(abi,contractAddress)
      }
  }
  else {
      window.alert('Non-ethereum browser detected. You should consider trying Metamask')
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      const networkId = await web3.eth.net.getId()
    const networkData =await  DCVS.networks[networkId]
    const contractAddress = await networkData.address
      results = {
        web3 : web3,
        initiatedContract : new web3.eth.Contract(abi,contractAddress)
      }
  }
  return results
}

export default loadWeb3;



