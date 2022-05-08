import React from "react";
import './MintCard.css'
import { useEffect, useState } from 'react';
import contract from '../../JustApples.json';
import { ethers } from 'ethers';
import { Web3Provider } from 'ethers';


const contractAddress = "0x6bf6280987CC999dEd58dA303859443816e28062";
const abi = contract.abi;
function Card({Title, imgUrl, body}) {

    const [mintAmount, setMintAmount] = useState(1);
const [currentAccount, setCurrentAccount] = useState(null);

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
      };
    
      const handleincrement = () => {
        if (mintAmount >= 15) return;
        setMintAmount(mintAmount + 1);
      };

      const mintNftHandler = async () => {
        try {
          const { ethereum } = window;
    
          if (ethereum) {
            
    
            
    
            const provider = new ethers.providers.Web3Provider(ethereum);
            console.log('hello 1',provider)
            let signer = provider.getSigner();
            console.log(signer)
            const nftContract = new ethers.Contract(contractAddress, abi, signer);
    
            console.log("initialize payment");
            let nftTxn = await nftContract.mint(1, { value: ethers.utils.parseEther(".025")});
    
            console.log("Minting please wait");
            await nftTxn.wait();
    
            console.log('Minted, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}');
          } else {
            console.log("Ethereum object does not exsit");
          }
        } catch (err) {
          console.log(err);
        }
       }
    return (
        <div className="card-conatiner bg-indigo-600">
            <div className="image-container">
                <img src= {imgUrl} alt=''></img>
                
            </div>
            <div className="card-title">
                <h3>{Title}</h3>

            </div>
            <div className="card-body">
                {body}
            </div>
            <div className='minting'> 
          <button onClick={handleDecrement} className='Dec'>-</button>
          <input type="number" value={mintAmount} className='number'></input>
          <button onClick={handleincrement} className='Inc'>+</button>
          <button onClick={mintNftHandler} className='mintNftButton'>Mint Later!</button>
        
          </div>
        </div>
    )
}

export default Card;