import React from 'react'
import Logo from './assets/background/BlackDiamond.png'
import ConnectWallet from './ConnectWallet'
const  NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount () {
    if (window.ethereum) { // metamask Enjects the application with web3, it also checks and grabs the accounts from the metamasks
      const accounts = await window.ethereum.request ({
        method: "eth_requestAccounts",
       
      });
      setAccounts(accounts);// Back In app js it is going to update the state, whenever this function happens and when I call it will update the accounts
    }
  }

  return (
    <>
        <div className='bg-green-400 p-3 relative' > {/*NavBar Container */}
        <div className='flex justify-center space-x-80 font-bold items-center '> {/*Items Container */}
        
         <img src={Logo} className="h-20 rounded-full border-4 border-indigo-400 shadow-xl " alt="some text about image" />
            <h3 className='px-9'>MainWebsite</h3>
            <div>
            {/* <h3 className='px-9'>ConnecWallet</h3> */}
            {isConnected ? (
              <p className='bg-purple-800 p-3 font-bold text-2xl rounded-xl text-slate-200 text-base'>Connected</p>
            ) : (
              <div className='flex justify-center items-center releastive font-medium '>
              <button onClick={connectAccount} className='bg-purple-600 p-3 font-bold text-2xl rounded-xl text-slate-200 text-base'>
              Connect Wallet
            </button>
            </div>
            )}
            </div>
           
        </div>

       </div>
    </>
  )
}

export default NavBar