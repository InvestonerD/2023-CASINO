import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { SolongWalletAdapter } from '@solana/wallet-adapter-solong';
import { TrustWalletAdapter } from '@solana/wallet-adapter-trust';
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger';
import { SolletWalletAdapter } from '@solana/wallet-adapter-sollet';
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletContextWrapper = ({ children }) => {
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
          {children}
        </WalletModalProvider>
      </ConnectionProvider>
    </WalletProvider>
  );
};

export { WalletContextWrapper };