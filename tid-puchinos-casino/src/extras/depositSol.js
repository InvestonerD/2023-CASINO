import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction, PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";

import io from "socket.io-client";

// const socket = io("http://localhost:4000/general");
const socket = io('casino-server.fly.dev/general');

const SendBlazed = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handlePayment = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!publicKey) throw new WalletNotConnectedError();

        const toPublicKey = new PublicKey("AHiVeE85J8CWH4Kjgosje7DbBbtvoBtvNuvoMgtWUr3b");

        const lamports = document.getElementById("deposit-input").value * 1000000000;

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: toPublicKey,
            lamports,
          })
        );

        const signedTransaction = await sendTransaction(transaction, connection);

        await connection.confirmTransaction(signedTransaction);

        const username = document.getElementById("username").innerHTML;

        socket.emit("deposit", {
          username: username,
          amount: lamports,
        });

        resolve("Solana sent successfully!");
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleClick = async () => {
    try {
        await toast.promise(handlePayment(), {
            pending: "Sending Solana...",
            success: "Solana sent successfully!",
            error: "Failed to send Solana.",
        });
    } catch (error) {
        let message = "Unknown error occurred.";
        if (error instanceof WalletNotConnectedError) {
            message = "Please connect your wallet.";
        } else if (error.code === 4001) {
            message = "User rejected the transaction.";
        } else if (error.message.includes("User rejected the request.")) {
            message = "Transaction rejected by user.";
        } else if (error.message.includes("Phantom - RPC Error")) {
            message = "Transaction rejected by Phantom wallet.";
        }
        toast.error(message);
    }
};

  return (
    <div className="deposit-input">

      <h1>Deposit</h1>

        <div className='input-container'>

            <input type="number" placeholder="Enter amount" id='deposit-input' />

            <button id='deposit-button' onClick={handleClick}>Deposit</button>

        </div>

    </div>
  );
};

export default SendBlazed;
