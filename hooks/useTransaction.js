"use client";

import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useDispatch, useSelector } from "react-redux";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import useGetServer from "./useGetServer";
import usePostServer from "./usePostServer";
import { removeAllTransactions, setTransactions } from "@/redux/profileSlice";

export default function useTransaction() {
  const mnemonics = useSelector((state) => state.wallet.mnemonics);
  const cluster = useSelector((state) => state.profile.connection);
  const { getTransactionById } = useGetServer();
  const { addTransaction } = usePostServer();
  const dispatch = useDispatch();

  const getAllTransactions = async (limit = 10) => {
    const connection = new Connection(cluster);

    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const transactionsSig = await connection.getConfirmedSignaturesForAddress2(
      keypair.publicKey,
      {
        limit,
      }
    );

    const allTransactions = [];

    for (let i = 0; i < transactionsSig.length; i++) {
      let serverTransaction = await getTransactionById(
        transactionsSig[i].signature
      );
      if (serverTransaction) {
        allTransactions.push(serverTransaction);
      } else {
        const web3Transaction = await getTransaction(
          transactionsSig[i].signature
        );
        allTransactions.push(web3Transaction);
      }
    }

    dispatch(removeAllTransactions());
    dispatch(setTransactions(allTransactions));
  };

  const getTransaction = async (signature) => {
    const connection = new Connection(cluster, "confirmed");
    const transaction = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });
    const simplifiedTransaction = {
      txId: signature,
      date: transaction.blockTime * 1000,
      amount:
        transaction.meta.postTokenBalances.length > 0 &&
        transaction.meta.preTokenBalances.length > 0
          ? transaction.meta.preTokenBalances[0].uiTokenAmount.uiAmount -
            transaction.meta.postTokenBalances[0].uiTokenAmount.uiAmount
          : (transaction.meta.preBalances[0] -
              transaction.meta.postBalances[0]) /
            LAMPORTS_PER_SOL,
      sender: transaction.transaction.message.accountKeys[0].pubkey.toString(),
      recipient:
        transaction.transaction.message.accountKeys[1].pubkey.toString(),
      currency:
        transaction.meta.postTokenBalances.length > 0
          ? transaction.meta.postTokenBalances[0].mint ===
            "F3hocsFVHrdTBG2yEHwnJHAJo4rZfnSwPg8d5nVMNKYE"
            ? "USDC"
            : "Unk"
          : "SOL",
    };

    return simplifiedTransaction;
  };

  const createSendTransaction = async (txId, amount, recipient, currency) => {
    await addTransaction(txId, amount, recipient, currency);
  };

  const createSwapTransaction = async (
    txId,
    amount,
    recipient,
    currency,
    swappedAmount
  ) => {
    await addTransaction(
      txId,
      amount,
      recipient,
      currency,
      true,
      false,
      swappedAmount
    );
  };

  const createVoucherTransaction = async (
    txId,
    amount,
    recipient,
    currency
  ) => {
    await addTransaction(txId, amount, recipient, currency, false, true);
  };

  return {
    getAllTransactions,
    getTransaction,
    createSendTransaction,
    createSwapTransaction,
    createVoucherTransaction,
  };
}
