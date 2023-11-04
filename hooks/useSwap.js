"use client";
import { useSelector } from "react-redux";
import { Keypair, Connection } from "@solana/web3.js";
import * as bip39 from "bip39";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { VersionedTransaction } from "@solana/web3.js";
import { MyWallet } from "./MyWallet";
import useToast from "./useToast";
import { useDispatch } from "react-redux";
import { setQuote, setQuoteUSDC } from "@/redux/profileSlice";
import useTransaction from "./useTransaction";

export default function useSwap() {
  const cluster = useSelector((state) => state.profile.connection);
  const mnemonics = useSelector((state) => state.wallet.mnemonics);
  const { Success, Error } = useToast();
  const dispatch = useDispatch();
  const { createSwapTransaction } = useTransaction();

  const swap = async (amount, swappedAmount) => {
    try {
      const connection = new Connection(cluster, "confirmed");

      const seed = bip39.mnemonicToSeedSync(mnemonics);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));

      const wallet = new MyWallet(keypair);

      const data = await (
        await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=${
            amount * LAMPORTS_PER_SOL
          }&slippageBps=50`
        )
      ).json();
      console.log(data);

      const transaction = await (
        await fetch("https://quote-api.jup.ag/v6/swap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quoteResponse: data,
            userPublicKey: wallet.publicKey.toString(),
            wrapUnwrapSOL: true,
          }),
        })
      ).json();

      const { swapTransaction } = transaction;

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      let tx = VersionedTransaction.deserialize(swapTransactionBuf);
      console.log(tx);

      tx.sign([wallet.payer]);

      const rawTransaction = tx.serialize();
      const txId = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txId,
      });
      Success("Swap Successful");

      createSwapTransaction(
        txId,
        amount,
        keypair.publicKey.toString(),
        "SOL",
        swappedAmount
      );

      return true;
    } catch (err) {
      Error("Swap Failed");
      console.log(err);
      return false;
    }
  };

  const swapUSDC = async (amount, swappedAmount) => {
    try {
      const connection = new Connection(cluster, "confirmed");

      const seed = bip39.mnemonicToSeedSync(mnemonics);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));

      const wallet = new MyWallet(keypair);

      const data = await (
        await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&outputMint=So11111111111111111111111111111111111111112&amount=${
            amount * Math.pow(10, 6)
          }&slippageBps=50`
        )
      ).json();

      const transaction = await (
        await fetch("https://quote-api.jup.ag/v6/swap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quoteResponse: data,
            userPublicKey: wallet.publicKey.toString(),
            wrapUnwrapSOL: true,
          }),
        })
      ).json();

      const { swapTransaction } = transaction;

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      let tx = VersionedTransaction.deserialize(swapTransactionBuf);
      console.log(tx);

      tx.sign([wallet.payer]);

      const rawTransaction = tx.serialize();
      const txId = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txId,
      });
      Success("Swap Successful");
      createSwapTransaction(
        txId,
        amount,
        keypair.publicKey.toString(),
        "USDC",
        swappedAmount
      );
      return true;
    } catch (err) {
      Error("Swap Failed");
      console.log(err);
      return false;
    }
  };

  const quote = async (amount) => {
    try {
      const data = await (
        await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=${
            amount * LAMPORTS_PER_SOL
          }&slippageBps=50`
        )
      ).json();
      dispatch(setQuote(data));
    } catch (err) {
      console.log(err);
      Error("Quote cannot be fetched");
    }
  };

  const quoteUSDC = async (amount) => {
    try {
      const data = await (
        await fetch(
          `https://quote-api.jup.ag/v6/quote?inputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&outputMint=So11111111111111111111111111111111111111112&amount=${
            amount * Math.pow(10, 6)
          }&slippageBps=50`
        )
      ).json();
      dispatch(setQuoteUSDC(data));
    } catch (err) {
      console.log(err);
      Error("Quote cannot be fetched");
    }
  };

  return { swap, swapUSDC, quote, quoteUSDC };
}
