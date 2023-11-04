"use client";

import axios from "axios";
import useToast from "./useToast";
import { useDispatch, useSelector } from "react-redux";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import nacl from "tweetnacl-sealed-box";
import bs58 from "bs58";
import { addVoucher, setUser } from "@/redux/profileSlice";
import { useRouter } from "next/navigation";
import { addMessage, setChatId } from "@/redux/contactSlice";

export default function usePostServer() {
  const { Error, Success } = useToast();
  const mnemonics = useSelector((state) => state.wallet.mnemonics);
  const dispatch = useDispatch();
  const router = useRouter();

  const generateToken = async (signature) => {
    try {
      const data = { signature };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/auth`,
        data
      );
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      Error("Something went wrong");
    }
  };

  const createUser = async ({ firstName, lastName, avatarId }) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const keys = nacl.box.keyPair.fromSecretKey(keypair.secretKey.slice(0, 32));

    const data = {
      chatPubkey: bs58.encode(keys.publicKey),
      firstName,
      lastName,
      avatarId,
      cardColor: "black",
    };

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
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user/create`,
        data,
        { headers }
      );
      dispatch(setUser(res.data));
      router.push("/dashboard");
      Success("User Successfully Created");
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
    }
  };

  const createUserRandom = async () => {
    const randomNumber = Math.floor(Math.random() * 1000);

    await createUser({
      firstName: "Eminence",
      lastName: `User-${randomNumber}`,
      avatarId: `avatar-${randomNumber}`,
    });
  };

  const createChat = async (pubkey) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/welcome");
      return;
    }

    const body = {
      userId: pubkey,
    };

    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/chat`,
        body,
        { headers }
      );

      dispatch(setChatId(res.data));
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
    }
  };

  const createMessage = async (type, chatId, message) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/welcome");
      return;
    }

    const body = {
      type,
      chatId,
      message,
    };

    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/message`,
        body,
        { headers }
      );

      dispatch(addMessage(res.data));
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
    }
  };

  const createVoucher = async (amount, message, voucherId) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/welcome");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/voucher/create`,
        {
          method: "POST",
          body: JSON.stringify({
            amount,
            message,
            voucherId,
            cardColor: "Black",
          }),
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
            "x-auth-pubkey": keypair.publicKey.toString(),
          },
        }
      );

      const data = await response.json();

      if (data.error) {
        Error("Something went wrong");
        return false;
      }

      dispatch(addVoucher(data));

      Success("Voucher Created Successfully");
      return true;
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
      return false;
    }
  };

  const addContact = async (pubkey) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

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
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user/add/${pubkey}`,
        { body: null },
        { headers }
      );
      Success("Contact Added");

      dispatch(setUser(res.data));
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
    }
  };

  const removeContact = async (pubkey) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/login");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user/remove/${pubkey}`,
        { headers }
      );
      Success("Contact Removed");

      dispatch(setUser(res.data));
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
    }
  };

  const removeChat = async (chatId) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/login");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/chat/${chatId}`,
        { headers }
      );

      Success("Contact Chat Removed");
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
    }
  };

  const removeMessages = async (chatId) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/login");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/message/${chatId}`,
        { headers }
      );

      Success("All Contact Messages Removed");
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
    }
  };

  const updateUser = async (firstName, lastName, avatarId) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/welcome");
      return;
    }

    const data = {
      firstName,
      lastName,
      avatarId,
    };

    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user/update`,
        data,
        { headers }
      );
      Success("User Updated Successfully");
      dispatch(setUser(res.data));
      return true;
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
      return false;
    }
  };

  const updateCardColor = async (cardColor) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/welcome");
      return;
    }

    const data = {
      cardColor,
    };

    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/user/update/cardcolor`,
        data,
        { headers }
      );
      Success("Card Updated Successfully");
      dispatch(setUser(res.data));
      return true;
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
      return false;
    }
  };

  const addTransaction = async (
    txId,
    amount,
    recipient,
    currency,
    isSwap,
    isVoucher,
    swappedAmount
  ) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));
    const token = localStorage.getItem("token");

    if (!token) {
      Error("Please Login");
      router.push("/welcome");
      return;
    }

    let type = "";

    if (isSwap) {
      type = "swap";
    } else if (isVoucher) {
      type = "voucher";
    }

    const body = {
      txId,
      sender: keypair.publicKey.toString(),
      amount,
      recipient,
      currency,
      swappedAmount,
      type,
    };

    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
      "x-auth-pubkey": keypair.publicKey.toString(),
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/api/transaction/create`,
        body,
        { headers }
      );
    } catch (err) {
      console.log(err);
      Error("Something went wrong");
    }
  };

  return {
    generateToken,
    createUser,
    createUserRandom,
    createChat,
    createMessage,
    createVoucher,
    addContact,
    removeContact,
    removeChat,
    removeMessages,
    updateUser,
    updateCardColor,
    addTransaction,
  };
}
