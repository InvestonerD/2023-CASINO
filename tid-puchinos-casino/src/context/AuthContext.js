import React from 'react';
import { useEffect } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
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

import '@solana/wallet-adapter-react-ui/styles.css';

const useWalletEffect = () => {
  const { connected, publicKey, keyPair } = useWallet();

  useEffect(() => {
    if (connected) {
      toast.success('Wallet connected successfully');
      localStorage.setItem('keyPair', JSON.stringify(keyPair));
      localStorage.setItem('publicKey', publicKey.toString());
    }
  }, [connected, keyPair, publicKey]);
};

const AuthWrapper = ({ children }) => {
  const endpoint = 'https://flashy-blissful-emerald.solana-mainnet.discover.quiknode.pro/5fa5cacd9e4a581e727c0bc7fa844c452f0c30cb/';
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new SolongWalletAdapter(),
    new TrustWalletAdapter(),
    new LedgerWalletAdapter(),
    new SolletWalletAdapter(),
  ];

  useWalletEffect();

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <ConnectionProvider endpoint={endpoint}>
        <WalletModalProvider>
          {children}
          <WalletMultiButton />
        </WalletModalProvider>
      </ConnectionProvider>
    </WalletProvider>
  );
};

export { AuthWrapper };
