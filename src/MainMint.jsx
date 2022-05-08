import React from 'react'
import { useState } from 'react'
import { ethers, BigNumber } from 'ethers';
import apple from './JustApples.json';
import AppleImage from './appleCard.png';
import ConnectWallet from './ConnectWallet'

const contractAddress = "0x6bf6280987CC999dEd58dA303859443816e28062";
const abi = apple.abi;


const MainMint= ({accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(0);
    const isConnected = Boolean(accounts[0]);



    async function handleMint() {
        
        if (window.ethereum) { //if it has metamask Lgged in
            const provider = new ethers.providers.Web3Provider(window.ethereum); // a Way for ethers to connect to the block chain
            const signer = provider.getSigner(); //for every time you handle a mint something you need to sign
            const contract = new ethers.Contract(
                contractAddress,
                apple.abi,
                signer
            );
            try {
               const response = await contract.mint(BigNumber.from(mintAmount));
               console.log('response: ', response);
            }  catch(err) {
            console.log("error: ", err)
            }
        }
    }

    const Decrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount -1);
    };

    const Increment = () => {
        if (mintAmount >= 15) return;
        setMintAmount(mintAmount +1);
    };






  return (
    <>
    {isConnected? (
        <div className="flex h-screen justify-center items-center ">
            <div className='grid grid-cols-5 mt-10 shadow-lg'>
                <div className='flex flex-col bg-indigo-500 col-span-3 rounded-md rounded-r-none  text-white p-8 w-96'>
                    <div className="flex justify-center">
                        <img src={AppleImage} className="h-32 rounded-full border-4 border-indigo-400 shadow-xl" alt="some text about image" />
                    </div>
                    <div className="flex justify-center rounded-md p-2 mt-6 px-20 m-2 font-bold">
                        <h2>0/3333 Minted</h2>
                    </div>
                    <div className="flex justify-center rounded-md p-2 mt-6 px-20 m-2 shadow-xl bg-green-500 font-light hover:bg-orange-400">
                        <h2>Learn More!</h2>
                    </div>
                    <div className="flex justify-center rounded-md p-2 px-20 m-1 shadow-xl bg-green-500 font-light hover:bg-orange-400">
                        <button className='font-light' type="">View On OpenSea</button>
                    </div>
                </div>
                <div className='flex flex-col justify-center bg-indigo-600 col-span-2 rounded-r-md text-white ' >
                    <div className='flex justify-center font-bold'>
                        <h1>Select Mint Amount</h1>
                    </div>
                    <div className='flex justify-center  my-3 '>
                        <button className='p-3' onClick={Decrement}>-</button>
                        <input className='rounded-md shadow-lg py-1 text-black w-16 text-center	' type="number" value={mintAmount}  />
                        <button className='p-3' onClick={Increment}>+</button>
                    </div>
                    <div className="flex justify-center rounded-md p-2 mt-6 px-20 m-2 shadow-xl bg-red-500 font-bold hover:bg-orange-400">
                        <button onClick={handleMint}>Mint Now!</button>
                    </div>
                </div>
            </div>
        </div>
        ) : (
            <h1></h1>
        )} 
    </>
  )
}

export default MainMint