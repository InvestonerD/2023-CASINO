import React, { useEffect } from 'react';
import { ConnectionProvider, WalletProvider, useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { SolongWalletAdapter } from '@solana/wallet-adapter-solong';
import { TrustWalletAdapter } from '@solana/wallet-adapter-trust';
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger';
import { SolletWalletAdapter } from '@solana/wallet-adapter-sollet';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../images/design/logo.png';

import '@solana/wallet-adapter-react-ui/styles.css';


const useWalletEffect = () => {
  const { publicKey } = useWallet();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!publicKey) {
        toast(
          <div className="toast-container">
            <img src={logo} className="toast-image" alt="Logo" />
            <span>Connect a wallet to get started!</span>
          </div>,
          {
            className: 'toastify-toast'
          }
        );
      } 
    }, 1500);

    return () => {
      clearTimeout(timer);
    }

  }, [publicKey]);
};

const WalletButton = () => {

  const { connected, disconnect, publicKey } = useWallet();
  useConnection();
  useWalletEffect();

const handleClick = async () => {

    if (!connected) {

      try {
        setInterval(() => {
          if (!connected && document.querySelector('.wallet-adapter-button').innerHTML !== 'Select Wallet') {
            toast('Select a wallet to get started!');
            window.location.reload();
          } 
        }, 1000);
      } catch (err) {
        console.log('Error connecting wallet:', err);
      }

    } else {

      try {
        await disconnect();
        toast.error('Wallet disconnected');
      } catch (err) {
      }

    }

};

  return (
    <WalletMultiButton onClick={handleClick} title={connected ? 'Disconnect' : 'Connect'}>
      {connected ? `${publicKey?.toBase58().slice(0, 4)}...${publicKey?.toBase58().slice(-4)}` : 'Select Wallet'}
    </WalletMultiButton>
  );

};

const AuthWrapper = ({ children }) => {

  // const endpoint = 'https://flashy-blissful-emerald.solana-mainnet.discover.quiknode.pro/5fa5cacd9e4a581e727c0bc7fa844c452f0c30cb/';
  const endpoint = 'https://autumn-thrilling-dream.solana-devnet.discover.quiknode.pro/cdc1d1130bd4e838ac4ec0128c74541afe233a61/';
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new SolongWalletAdapter(),
    new TrustWalletAdapter(),
    new LedgerWalletAdapter(),
    new SolletWalletAdapter(),
  ];

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <ConnectionProvider endpoint={endpoint}>
        <WalletModalProvider>
          <WalletButton>
            {children}
          </WalletButton>
        </WalletModalProvider>
      </ConnectionProvider>
    </WalletProvider>
  );
};

export { AuthWrapper, useWalletEffect };
