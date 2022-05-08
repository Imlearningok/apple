// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract JustApples is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply; // how many were minted so far
    uint256 public maxSupply; // the max supply
    uint256 public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri; //this will determin were the images are located
    address payable public withdrawWallet; 
    mapping(address => uint256) public walletMints; //keep track of all the mints

    constructor() payable ERC721('JustApples','RP') {
        mintPrice = .025 ether;
        totalSupply = 0;
        maxSupply= 2222;
        maxPerWallet = 15;
        //set withdraw wallet addres
    }
    // we pout a _ to specify this is actually a arguement, external is coming from Ownable
    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_; //allows us to change when mint is aval
    } 
 //calldata allows us to know this is just gonna be read
    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner{ //basetokenuri is the url that has the images
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) { //the token uri is the function that opensea calls to grab the images
        require(_exists(tokenId_), 'Token does not Exsit!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json")); // we are taking the url that we Identified, grabing the id, placing it behined the url and attaching .json ot the end of it, allowing open sea to grab the image
    
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{ value: address(this).balance}(''); //we are grabing the wallet, calling it and pass the value of the contract, and pass in balance, and pass in empty.
        require(success, 'withdraw failed'); //allowing to withdraw fund to the addres we specified with withdraw wallet, and if it asucceds it keeps going if it doesnt it shoots a error message 
    }
    function mint(uint256 quantity_) public payable { //we passed in a _ after quanitty to make it a argument, payable is anyone that wants a value transfer
        require(isPublicMintEnabled, 'minting not enabled');
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');//make sure they are minting the right price
        require(totalSupply + quantity_ <= maxSupply, 'Sold out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max Mints per wallet');

        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1; //keep track of the amount minted, we add 1 to the minted supply
            totalSupply++;
            _safeMint(msg.sender, newTokenId); //msg.sender is the person minting and its wallet
        }
    }
}