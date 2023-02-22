import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"


const connectButton = document.getElementById("connectButton")
const tokenuri1 = document.getElementById("withdrawButton")
const transferNFT = document.getElementById("balanceButton")
const nftget = document.getElementById("GetNFT")

connectButton.onclick = connect
tokenuri1.onclick = tokenuri
transferNFT.onclick = transferNFT1
nftget.onclick = GETNFT1

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
      console.log(error)
    }
    connectButton.innerHTML = "Connected"
    const accounts = await ethereum.request({ method: "eth_accounts" })
    console.log(accounts)
  } else {
    connectButton.innerHTML = "Please install MetaMask"
  }
}

async function tokenuri() {
  const id  =  document.getElementById("ethAmount2").value
  var yusuf=parseInt(id);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const transactionResponse = await contract.tokenURI(id);
      document.getElementById("yazdır").innerHTML=await listenForTransactionMine(transactionResponse, provider)
      // await transactionResponse.wait(1)
    } catch (error) {
      console.log(error)
    }
  } else {
    withdrawButton.innerHTML = "Please install MetaMask"
  }
}

async function transferNFT1() {
  const id  =  document.getElementById("ethAmount2").value
  var yusuf=parseInt(id);
  const newowner  =  document.getElementById("ethAmount4").value
  console.log(`Withdrawing...`)
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const transactionResponse = await contract.transferNFT(yusuf,newowner);
      await listenForTransactionMine(transactionResponse, provider)
      // await transactionResponse.wait(1)
    } catch (error) {
      console.log(error)
    }
  } else {
    withdrawButton.innerHTML = "Please install MetaMask"
  }
}

async function GETNFT() {
  const id  =  document.getElementById("ethAmount2").value
  var yusuf=parseInt(id);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const transactionResponse = await contract.getNFT(yusuf);
      await listenForTransactionMine(transactionResponse, provider)
      // document.getElementById("GETNFT").innerHTML = listenForTransactionMine(transactionResponse, provider);
      // await transactionResponse.wait(1)
    } catch (error) {
      console.log(error)
    }
  } else {
    withdrawButton.innerHTML = "Please install MetaMask"
  }
}

async function GETNFT1(){
  const id  =  document.getElementById("ethAmount2").value
  var yusuf=parseInt(id);
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/eth_goerli")
  const signer = provider.getSigner("0x0f8C5cA910Bed76Ca12f0a769572cCB4fD910636")
  const contract = new ethers.Contract(
    contractAddress,
    abi,
    signer,
 )

  const result = await contract.tokenURI(id)
  var jsonobj=JSON.parse(Get(result))
  document.getElementById("yazdır").src = jsonobj.image
  
}

function Get(yourUrl){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",yourUrl,false);
  Httpreq.send(null);
  return Httpreq.responseText;          
}
 
function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(
                    `Completed with ${transactionReceipt.confirmations} confirmations. `
                )
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}
