"use client";
import { OnrampWebSDK } from "@onramp.money/onramp-web-sdk";
import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { useSelector } from "react-redux";
import useToast from "./useToast";
import axios from "axios";

export default function useDeposit() {
  const mnemonics = useSelector((state) => state.wallet.mnemonics);
  const { Error } = useToast();

  const initiateOnramp = (coinCode, fiatType, fiatAmount) => {
    const seed = bip39.mnemonicToSeedSync(mnemonics);
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    const onrampInstance = new OnrampWebSDK({
      appId: 1, // replace this with the appID you got during onboarding process
      walletAddress: keypair.publicKey.toString(), // replace with user's wallet address
      flowType: 1, // 1 -> onramp || 2 -> offramp || 3 -> Merchant checkout
      paymentMethod: 2,
      coinCode: coinCode,
      fiatAmount: fiatAmount,
      network: "spl",
      fiatType: fiatType,
    });

    onrampInstance.show();
  };

  const fetchConversion = async (coinCode, fiatType, fiatAmount) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXT_URL}/coindetails?coinCode=${coinCode}&fiatType=${fiatType}&fiatAmount=${fiatAmount}`
      );
      return response.data.price;
    } catch (e) {
      Error("Can't fetch conversion");
    }
  };

  return { initiateOnramp, fetchConversion };
}
