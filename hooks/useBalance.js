"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  addBalanceListener,
  removeAllBalanceListeners,
  setBalance,
  setBalanceUSDC,
} from "@/redux/profileSlice";
import {
  LAMPORTS_PER_SOL,
  Keypair,
  Connection,
  PublicKey,
} from "@solana/web3.js";
import * as bip39 from "bip39";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import useTransaction from "./useTransaction";

export default function useBalance() {
  const cluster = useSelector((state) => state.profile.connection);
  const dispatch = useDispatch();
  const mnemonics = useSelector((state) => state.wallet.mnemonics);
  const { getAllTransactions } = useTransaction();
  const balanceListerners = useSelector(
    (state) => state.profile.balanceListerners
  );

  const getBalance = async () => {
    const connection = new Connection(cluster, "confirmed");
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const balance = await connection.getBalance(keypair.publicKey, "confirmed");
    dispatch(setBalance(balance / LAMPORTS_PER_SOL));
    getAllTransactions();
  };

  const getBalanceUSDC = async () => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const tokenAddress = new PublicKey(
      cluster === "https://api.devnet.solana.com"
        ? "F3hocsFVHrdTBG2yEHwnJHAJo4rZfnSwPg8d5nVMNKYE"
        : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    );

    const connection = new Connection(cluster, "confirmed");

    try {
      const accountInfo = getAssociatedTokenAddressSync(
        tokenAddress,
        keypair.publicKey
      );
      const balance = await connection.getTokenAccountBalance(accountInfo);
      dispatch(setBalanceUSDC(balance.value.uiAmount));
      getAllTransactions();
    } catch (err) {
      dispatch(setBalanceUSDC(0));
    }
  };

  //Balance Listerner
  const balanceListener = async () => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const connection = new Connection(cluster, "confirmed");

    //Remove previous Listeners
    if (balanceListerners.length > 0) {
      balanceListerners.forEach((element) => {
        connection.removeAccountChangeListener(element);
      });
    }

    dispatch(removeAllBalanceListeners());

    //Listen for Sol Balance
    const Connectionid = connection.onAccountChange(
      keypair.publicKey,
      (accountInfo) => {
        getBalance();
      }
    );
    dispatch(addBalanceListener(Connectionid));

    //Listen for Token Balance
    const tokenAddress = new PublicKey(
      cluster === "https://api.devnet.solana.com"
        ? "F3hocsFVHrdTBG2yEHwnJHAJo4rZfnSwPg8d5nVMNKYE"
        : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    );

    const accountInfo = getAssociatedTokenAddressSync(
      tokenAddress,
      keypair.publicKey
    );

    const TokenConnectionid = connection.onAccountChange(
      accountInfo,
      (accountInfo) => {
        getBalanceUSDC();
      }
    );
    dispatch(addBalanceListener(TokenConnectionid));
  };

  return { getBalance, getBalanceUSDC, balanceListener };
}
