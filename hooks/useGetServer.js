"use client";
import axios from "axios";
import useToast from "./useToast";
import { useDispatch, useSelector } from "react-redux";
import { Keypair } from "@solana/web3.js";
import { setUser, setVouchers } from "@/redux/profileSlice";
import { useRouter } from "next/navigation";
import * as bip39 from "bip39";
import useCreateWallet from "./useCreateWallet";
import usePostServer from "./usePostServer";
import { setUserContacts } from "@/redux/profileSlice";
import { setMessages } from "@/redux/contactSlice";

export default function useGetServer() {
  const { Error } = useToast();
  const mnemonics = useSelector((state) => state.wallet.mnemonics);
  const dispatch = useDispatch();
  const router = useRouter();
  const { signMessage } = useCreateWallet();
  const { generateToken } = usePostServer();

  const getUserByPubkey = async (pubkey) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user/info/${pubkey}`,
        { headers: "Content-Type: application/json" }
      );

      return res.data;
    } catch (err) {
      return false;
    }
  };

  const getUserByName = async (name) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const signature = await signMessage();

    await generateToken(signature);

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/welcome");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user/${name}`,
        { headers }
      );

      return res.data;
    } catch (err) {
      Error("User Not Found");
    }
  };

  const getUserSelf = async () => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const signature = await signMessage();

    await generateToken(signature);

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/welcome");
      return;
    }

    const headers = {
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user/info`,
        { headers }
      );

      dispatch(setUser(res.data));
    } catch (err) {
      router.push("/publicProfile");
      Error("User Not Found");
    }
  };

  const getUserContacts = async () => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/welcome");
      return;
    }

    const headers = {
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user/contacts`,
        { headers }
      );

      dispatch(setUserContacts(res.data));
      return res.data;
    } catch (err) {
      Error("Something Went Wrong");
    }
  };

  const getChatMessages = async (chatId) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/welcome");
      return;
    }

    const headers = {
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/message/${chatId}`,
        { headers }
      );

      dispatch(setMessages(res.data));
    } catch (err) {
      Error("Something Went Wrong");
    }
  };

  const fetchVouchers = async () => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/welcome");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/voucher/get`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
            "x-auth-pubkey": keypair.publicKey.toString(),
          },
        }
      );

      const data = await res.json();

      if (data.error) {
        Error("Something went wrong");
        return false;
      }

      dispatch(setVouchers(data));
      return true;
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
      return false;
    }
  };

  const getVoucherById = async (voucherId) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/voucher/get/${voucherId}`,
        { headers: "Content-Type: application/json" }
      );

      return res.data;
    } catch (err) {
      return false;
    }
  };

  const getTransactionById = async (signature) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/transaction/get/${signature}`,
        { headers: "Content-Type: application/json" }
      );

      if (!res.data) {
        return false;
      }
      return res.data;
    } catch (err) {
      return false;
    }
  };

  return {
    getUserSelf,
    getUserContacts,
    getChatMessages,
    getUserByPubkey,
    getUserByName,
    fetchVouchers,
    getTransactionById,
    getVoucherById,
  };
}
