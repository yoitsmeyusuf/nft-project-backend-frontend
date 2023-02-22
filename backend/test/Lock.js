const { expectRevert, time } = require("openzeppelin-test-helpers");
const { ethers,waffle } = require('hardhat');
const assert = require('chai').assert;
const NFTMarket = require('../artifacts/contracts/NFT.sol/NFTMarket.json');


describe('NFTMarket', () => {
    let nftMarket, creator, buyer;

    beforeEach(async () => {
        [creator, buyer] = await ethers.getSigners();
        const market = await ethers.getContractFactory("NFTMarket");
        nftMarket = await market.deploy( { gasLimit: 8000000 });
        const transactionHash = await buyer.sendTransaction({
          to: buyer.getAddress(),
          value: ethers.utils.parseEther("10"), // Sends exactly 1.0 ether
        });
       
    });

    it('should create NFT', async () => {
        const id = 1;
        const name = 'NFT 1';
        const imageUrl = 'https://example.com/image-1.jpg';

        await nftMarket.createNFT(id, name, imageUrl, { gasLimit: 8000000 });

        const [returnedName, returnedImageUrl, returnedOwner] = await nftMarket.getNFT(id);
        assert.equal(returnedName, name, 'Name should match');
        assert.equal(returnedImageUrl, imageUrl, 'Image URL should match');
        assert.equal(returnedOwner, await creator.getAddress(), 'Owner should match');
    });

    it('should transfer NFT', async () => {
        const id = 1;
        const name = 'NFT 1';
        const imageUrl = 'https://example.com/image-1.jpg';
        await nftMarket.createNFT(id, name, imageUrl, { gasLimit: 8000000 });

        await nftMarket.transferNFT(id, await buyer.getAddress(), { gasLimit: 8000000 });

        const [returnedName, returnedImageUrl, returnedOwner] = await nftMarket.getNFT(id);
        assert.equal(returnedOwner, await buyer.getAddress(), 'Owner should match');
    });

    it('should put NFT for sale', async () => {
        const id = 1;
        const name = 'NFT 1';
        const imageUrl = 'https://example.com/image-1.jpg';
        const price = ethers.utils.parseEther('1.0');
        await nftMarket.createNFT(id, name, imageUrl, { gasLimit: 8000000 });

        await nftMarket.NFTsale(id, price, { gasLimit: 8000000 });

        const nft = await nftMarket.getNFT(id,{gasLimit: 8000000 }) ;
      
        assert.equal(nft[3].toString(), price.toString() , 'Price should match');
        assert.equal(nft[4], true, 'isitputonsale should match');
        
    });

    it('should buy NFT', async () => {
        const id = 1;
        const name = 'NFT 1';
        const imageUrl = 'https://example.com/image-1.jpg';
        const price = ethers.utils.parseEther('0');
        await nftMarket.createNFT(id, name, imageUrl, { gasLimit: 8000000 });

        await nftMarket.NFTsale(id, price, { gasLimit: 8000000 });
        nftMarket.buyNFT(id ,{gasLimit: 8000000,from: await buyer.getAddress()});
    
        const [returnedName, returnedImageUrl, returnedOwner] = await nftMarket.getNFT(id);
        assert.equal(returnedOwner, await creator.getAddress(), 'Owner should match');
    });
    
     
    
  });