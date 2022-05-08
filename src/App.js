
import { useEffect, useState } from 'react';
import './App.css';
import contract from './JustApples.json';
import { ethers } from 'ethers';
import { Web3Provider } from 'ethers';
import  background  from './assets/background/Background.svg';
// import Card from './components/MintCard/MintCard';
import './assets/background/maxresdefault.jpg';
import Card from './MainMint';
import NavBar from './NavBar';
import ConnectWallet from './ConnectWallet';
import MainMint from './MainMint';
import detectEthereumProvider from '@metamask/detect-provider';


const contractAddress = "0x6bf6280987CC999dEd58dA303859443816e28062";
const abi = contract.abi;

function App() {
  const [accounts, setAccounts] = useState([]);
  return (<div className='App'>
    <NavBar accounts={accounts} setAccounts={setAccounts} />
    <MainMint accounts={accounts} setAccounts={setAccounts}/>
  </div>);
}



export default App;