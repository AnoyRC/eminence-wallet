"use client";
import { next, previous } from "@/redux/defaultSlice";
import { useDispatch, useSelector } from "react-redux";
import useCreateWallet from "./useCreateWallet";
import { useRouter } from "next/navigation";
import useToast from "./useToast";

export default function useOnboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { createWallet, saveToLocalStorage, createWalletWithImage } =
    useCreateWallet();
  const mnemonic = useSelector((state) => state.wallet.mnemonics);
  const { Success, Error } = useToast();

  const step1 = {
    CreateWallet: () => {
      createWallet();
      dispatch(next());
    },
    importWallet: () => {
      router.push("/importImage");
    },
  };

  const step2 = {
    Continue: async () => {
      await createWalletWithImage(true);
    },
    skip: () => {
      dispatch(next());
    },
  };

  const step3 = {
    ConfirmPhrase: (inputMnemonic) => {
      if (inputMnemonic === mnemonic) {
        Success("Security Phrase Confirmed");
        dispatch(next());
        return;
      }

      Error("Security Phrase Not Match");
    },
    Regenerate: () => {
      createWallet();
      dispatch(previous());
    },
  };

  const step4 = {
    ConfirmPassword: (password) => {
      saveToLocalStorage(password);
      dispatch(next());
    },
  };

  const step5 = {
    Continue: () => {
      router.push("/publicProfile");
    },
  };

  return {
    step1,
    step2,
    step3,
    step4,
    step5,
  };
}
