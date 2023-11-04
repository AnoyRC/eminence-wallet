"use client";

import useToast from "./useToast";
import { useSelector } from "react-redux";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  Elusiv,
  SEED_MESSAGE,
  airdropToken,
  getMintAccount,
} from "@elusiv/sdk";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as bip39 from "bip39";
import { sendAndConfirmTransaction } from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  transfer as tokenTransfer,
} from "@solana/spl-token";
import * as ed from "@noble/ed25519";
import { sign } from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
import useTransaction from "./useTransaction";

ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

export default function useTransfer() {
  const { Success, Error } = useToast();
  const cluster = useSelector((state) => state.profile.connection);
  const mnemonics = useSelector((state) => state.wallet.mnemonics);
  const { createSendTransaction } = useTransaction();

  const transfer = async (amount, to) => {
    try {
      const seed = bip39.mnemonicToSeedSync(mnemonics);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));

      const connection = new Connection(cluster, "confirmed");

      const toPubKey = new PublicKey(to.toString());

      const amountInLamports = amount * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: keypair.publicKey,
          toPubkey: toPubKey,
          lamports: amountInLamports,
        })
      );
      transaction.feePayer = keypair.publicKey;

      let txHash = await sendAndConfirmTransaction(connection, transaction, [
        keypair,
      ]);

      Success(
        "Transaction Success with Hash: " +
          txHash.toString().substring(0, 5) +
          "..." +
          txHash
            .toString()
            .substring(txHash.toString().length - 5, txHash.toString().length)
      );

      await createSendTransaction(txHash, amount, to, "SOL");

      return true;
    } catch (err) {
      Error("Transaction Failed");
      console.log(err);
      return false;
    }
  };

  const transferToken = async (amount, to) => {
    try {
      const tokenAddress = new PublicKey(
        cluster === "https://api.devnet.solana.com"
          ? "F3hocsFVHrdTBG2yEHwnJHAJo4rZfnSwPg8d5nVMNKYE"
          : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      );

      const connection = new Connection(cluster, "confirmed");

      const seed = bip39.mnemonicToSeedSync(mnemonics);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));

      const toWallet = new PublicKey(to.toString());

      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        tokenAddress,
        keypair.publicKey,
        undefined,
        "finalized"
      );

      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        tokenAddress,
        toWallet
      );

      const amountInLamports = amount * Math.pow(10, 6);

      const signature = await tokenTransfer(
        connection,
        keypair,
        fromTokenAccount.address,
        toTokenAccount.address,
        keypair.publicKey,
        amountInLamports
      );

      Success(
        "Transaction Success with Signature: " +
          signature.toString().substring(0, 5) +
          "..." +
          signature
            .toString()
            .substring(
              signature.toString().length - 5,
              signature.toString().length
            )
      );

      await createSendTransaction(txHash, amount, to, "USDC");

      return true;
    } catch (err) {
      console.log(err);
      Error("Transaction Failed");
      return false;
    }
  };

  const transferPrivate = async (amount, to) => {
    try {
      const connection = new Connection(cluster);

      const seed = bip39.mnemonicToSeedSync(mnemonics);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));

      const ElusivSeed = await sign(
        Buffer.from(SEED_MESSAGE, "utf-8"),
        keypair.secretKey.slice(0, 32)
      );

      const elusiv = await Elusiv.getElusivInstance(
        ElusivSeed,
        keypair.publicKey,
        connection,
        cluster === "https://api.devnet.solana.com" ? "devnet" : "mainnet-beta"
      );

      const topupTxData = await elusiv.buildTopUpTx(
        amount * LAMPORTS_PER_SOL,
        "LAMPORTS"
      );

      topupTxData.tx.sign(keypair);

      const topupSig = await elusiv.sendElusivTx(topupTxData);

      console.log(topupSig);

      const privateBalance = await elusiv.getLatestPrivateBalance("LAMPORTS");
      console.log(`Current private balance: ${privateBalance}`);

      const recipient = new PublicKey(to);
      const estimatedFee = await elusiv.estimateSendFee({
        recipient,
        amount: Number(privateBalance),
        tokenType: "LAMPORTS",
      });
      console.log(estimatedFee);
      const sendTx = await elusiv.buildSendTx(
        Number(privateBalance) - Number(estimatedFee.txFee),
        recipient,
        "LAMPORTS"
      );
      const sendSig = await elusiv.sendElusivTx(sendTx);

      console.log(
        `Performed topup with sig ${topupSig.signature} and send with sig ${sendSig.signature}`
      );

      Success(
        "Transaction Success with Signature: " +
          sendSig.signature.toString().substring(0, 5) +
          "..." +
          sendSig.signature
            .toString()
            .substring(
              sendSig.signature.toString().length - 5,
              sendSig.signature.toString().length
            )
      );

      return true;
    } catch (err) {
      console.log(err);
      Error("Transaction Failed");
      return false;
    }
  };

  const transferPrivateTokens = async (amount, to) => {
    try {
      const connection = new Connection(cluster);
      const seed = bip39.mnemonicToSeedSync(mnemonics);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));

      const ElusivSeed = sign(
        Buffer.from(SEED_MESSAGE, "utf-8"),
        keypair.secretKey.slice(0, 32)
      );

      const elusiv = await Elusiv.getElusivInstance(
        ElusivSeed,
        keypair.publicKey,
        connection,
        cluster === "https://api.devnet.solana.com" ? "devnet" : "mainnet-beta"
      );

      const topupTx = await elusiv.buildTopUpTx(
        amount * Math.pow(10, 6),
        "USDC"
      );

      topupTx.tx.partialSign(keypair);

      const sig = await elusiv.sendElusivTx(topupTx);

      console.log(sig);

      const privateBalance = await elusiv.getLatestPrivateBalance("USDC");

      console.log(privateBalance);

      const recipient = new PublicKey(to);

      const estimatedFee = await elusiv.estimateSendFee({
        recipient,
        amount: Number(privateBalance),
        tokenType: "USDC",
      });

      const sendTx = await elusiv.buildSendTx(
        Number(privateBalance) - Number(estimatedFee.txFee),
        recipient,
        "USDC"
      );
      const sendSig = await elusiv.sendElusivTx(sendTx);

      console.log(sendSig.signature);

      Success(
        "Transaction Success with Signature: " +
          sendSig.signature.toString().substring(0, 5) +
          "..." +
          sendSig.signature
            .toString()
            .substring(
              sendSig.signature.toString().length - 5,
              sendSig.signature.toString().length
            )
      );

      return true;
    } catch (err) {
      console.log(err);
      Error("Transaction Failed");
      return false;
    }
  };

  return { transfer, transferToken, transferPrivate, transferPrivateTokens };
}
