import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction, PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";

const SendBlazed = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handlePayment = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!publicKey) throw new WalletNotConnectedError();

        const toPublicKey = new PublicKey("AHiVeE85J8CWH4Kjgosje7DbBbtvoBtvNuvoMgtWUr3b");

        const lamports = 1000000;

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: toPublicKey,
            lamports,
          })
        );

        const signedTransaction = await sendTransaction(transaction, connection);

        await connection.confirmTransaction(signedTransaction);

        resolve("Solana sent successfully!");
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleClick = async () => {
    try {
      const result = await toast.promise(handlePayment(), {
        pending: "Sending Solana...",
        success: "Solana sent successfully!",
        error: "Failed to send Solana. Please try again later.",
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleClick}>Send Solana</button>
    </>
  );
};

export default SendBlazed;