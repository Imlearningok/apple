import React from 'react'
import Card from './components/MainMint';
import { useEffect, useState } from 'react';
import ConnectWallet from './ConnectWallet';
import contract from './JustApples.json';
import { ethers } from 'ethers';

const contractAddress = "0x6bf6280987CC999dEd58dA303859443816e28062";
const abi = contract.abi;

function MintButton() {
    const [mintAmount, setMintAmount] = useState(1);
    const [currentAccount, setCurrentAccount] = useState(null);

    const checkWalletIsConnected = async () => { 
        const { ethereum } = window;
        console.log(window, "asdfsd")
        console.log(ethereum, "hey")
        if (!ethereum) {
          console.log("make sure you have MetMask Installed");
          return;
        } else {
          console.log("Wallet Exsits, we are ready to go!")
    
        }
    
        const accounts = await ethereum.request({ method: 'eth_accounts'});
    
        if (accounts.length !==0) {
          const account = accounts[0];
          console.log("Found an Authorized account: ", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      }


    
      
     console.log(checkWalletIsConnected, "WorldConnection")
      if (checkWalletIsConnected) {
        return <Card/>
  
      } else {
        return <ConnectWallet/>
      }
 
}

export default MintButton