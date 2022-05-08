import React, { Component } from 'react'
import contract from './JustApples.json';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const contractAddress = "0x6bf6280987CC999dEd58dA303859443816e28062";
const abi = contract.abi;

function ConnectWallet() {
    
const [mintAmount, setMintAmount] = useState(1);
  const [currentAccount, setCurrentAccount] = useState(null);
    const connectWalletHandler = async () => { 
        const { ethereum } = window;
    
        if (!ethereum) {
          alert("Please Install Metmask");
        }
        try {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
          console.log("Found An account! Address", accounts[0]);
          setCurrentAccount = accounts[0];
    
        } catch (err) {
          console.log(err)
        }
      }
      
    return (
        <div className='flex p-80 justify-center items-center'>
        <div className='flex justify-center items-center releastive'>
        <button onClick={connectWalletHandler} className='bg-blue-600 p-5 font-bold text-2xl rounded-xl text-slate-200'>
        Connect Wallet
      </button>
      </div>
      </div>
    )
  }









export default ConnectWallet