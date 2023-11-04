"use client";

import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { useDispatch, useSelector } from "react-redux";
import { setMnemonics, setPubKey } from "@/redux/walletSlice";
import forge, { random, pki } from "node-forge";
import useToast from "./useToast";
import { togglePopup } from "@/redux/checkLoginSlice";
import { useRouter } from "next/navigation";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { next } from "@/redux/defaultSlice";

export default function useCreateWallet() {
  const dispatch = useDispatch();
  const mnemonic = useSelector((state) => state.wallet.mnemonics);
  const { Error, Success } = useToast();
  const router = useRouter();
  const file = useSelector((state) => state.file.file);

  const createWallet = () => {
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));
    dispatch(setMnemonics(mnemonic));
    dispatch(setPubKey(keypair.publicKey.toString()));
  };

  const createWalletWithImage = async (onboard = false) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = new Uint8Array(e.target.result);
        var md = forge.md.sha256.create();
        md.update(result.slice(0, 5000));
        const hex = md.digest().toHex();
        const mnemonic = bip39
          .entropyToMnemonic(hex)
          .split(" ")
          .slice(0, 12)
          .join(" ");
        dispatch(setMnemonics(mnemonic));
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const keypair = Keypair.fromSeed(seed.slice(0, 32));
        dispatch(setPubKey(keypair.publicKey.toString()));
      };
      reader.readAsArrayBuffer(file);
      if (onboard) dispatch(next());
    } else {
      Error("Please upload an image");
    }
  };

  const importWallet = (mnemonic) => {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));
    dispatch(setMnemonics(mnemonic));
    dispatch(setPubKey(keypair.publicKey.toString()));
  };

  const saveToLocalStorage = (password) => {
    forge.pkcs5.pbkdf2(
      password,
      "Eminence",
      20000,
      24,
      function (err, derivedKey) {
        let iv = forge.random.getBytesSync(16);

        const message = mnemonic;
        let cipher = forge.cipher.createCipher("AES-CBC", derivedKey);
        cipher.start({ iv: iv });
        cipher.update(forge.util.createBuffer(message));
        cipher.finish();
        const encrypted = cipher.output;

        //Store Encrypted Mnemonic in localStorage
        localStorage.setItem(
          "secret",
          forge.util.createBuffer(iv).toHex() + encrypted.toHex()
        );
      }
    );
  };

  const retrieveFromLocalStorage = async (password, isPopUp) => {
    //Create RSA Key from Password
    const encrypted = localStorage.getItem("secret");
    const iv = forge.util.createBuffer(
      Buffer.from(encrypted.slice(0, 32), "hex")
    );
    const message = forge.util.createBuffer(
      Buffer.from(encrypted.slice(32), "hex")
    );

    let decryptedKey = null;

    const decryptCipher = async () => {
      let decipher = forge.cipher.createDecipher("AES-CBC", decryptedKey);
      decipher.start({ iv: iv });
      decipher.update(message);
      const response = await decipher.finish();

      if (!response) {
        Error("Incorrect Password");
        return;
      }

      //Import Wallet
      importWallet(decipher.output.toString());
      Success("Welcome to Eminence!");
      if (isPopUp) {
        dispatch(togglePopup(false));
      } else {
        router.push("/dashboard");
      }
    };

    await forge.pkcs5.pbkdf2(
      password,
      "Eminence",
      20000,
      24,
      async function (err, derivedKey) {
        decryptedKey = derivedKey;
        decryptCipher();
      }
    );
  };

  const signMessage = async () => {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const message =
      "Welcome to Eminence Wallet. Sign this message to verify your identity.";

    const signature = nacl.sign.detached(
      Buffer.from(message, "utf-8"),
      keypair.secretKey
    );

    return bs58.encode(signature);
  };

  return {
    createWallet,
    importWallet,
    saveToLocalStorage,
    retrieveFromLocalStorage,
    signMessage,
    createWalletWithImage,
  };
}
