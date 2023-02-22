require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
const ALCHEMY_API_KEY = "NxzI41e7fFwBi-YiK3cmXzHSSQo6AKEV";

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY = "ef94124dd68826a4455459f5e11ca41088d6ea8bb7d9630352a4fb058f53cf9f";
const ETHERSCAN = "JBH562354ABMC1R64FSKQR5KXUZ1IYXYW6"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
    
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN
    }
  },
  customChains: [
    {
      network: "goerli",
      chainId: 5,
      urls: {
        apiURL: "https://api-goerli.etherscan.io/api",
        browserURL: "https://goerli.etherscan.io"
      }
    }
  ]
};


