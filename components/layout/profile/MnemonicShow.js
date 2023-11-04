"use client";
import { KeyIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import {
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { Keypair } from "@solana/web3.js";
import { useSelector } from "react-redux";
import * as bip39 from "bip39";
import { useState } from "react";

export default function MnemonicShow() {
  const mnemonics = useSelector((state) => state.wallet.mnemonics);
  const [toggleMnemonic, setToggleMnemonic] = useState(false);
  const [togglePrivateKey, setTogglePrivateKey] = useState(false);

  return (
    <div className="w-full h-fit flex justify-center rounded-[8px] p-[0.5px] bg-red-900">
      <div className="bg-black rounded-[8px]  h-full flex flex-col items-start pl-24 w-full justify-center gap-5 py-10 text-center">
        <h1 className="text-2xl text-center text-red-900 font-bold">
          Danger Zone
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="w-10 h-10 rounded-[10px] bg-[#FF5C5C] flex items-center justify-center">
            <EyeSlashIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-white/70 text-lg">
            Do not let anyone see your secret phrase
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="w-10 h-10 rounded-[10px] bg-[#FF5C5C] flex items-center justify-center">
            <ExclamationTriangleIcon className="w-5 h-5 text-white" />
          </div>
          <p className="text-white/70 text-lg">
            Anyone with this phrase can steal your assets
          </p>
        </div>

        <button
          className=" h-[50px] rounded-[10px] bg-[#FF5C5C] px-5 text-white text-lg font-bold flex items-center justify-center gap-3"
          onClick={() => {
            setToggleMnemonic(true);
            setTogglePrivateKey(false);
            setTimeout(() => {
              setToggleMnemonic(false);
            }, 10000);
          }}
        >
          <ShieldExclamationIcon className="w-6 h-6" />
          Show Security Phrase
        </button>

        {toggleMnemonic && (
          <div className="flex items-center justify-center gap-4 bg-white/90 border-red-900 border-[1px] border-dashed rounded-xl h-[100px] p-10 w-[80%] text-center relative group">
            <div className="h-full w-full rounded-[8px] backdrop-filter backdrop-blur-sm absolute flex justify-center items-center group-hover:-z-10 z-10">
              <EyeIcon className="w-10 h-10 text-black" />
            </div>
            {mnemonics}
          </div>
        )}

        <button
          className=" h-[50px] rounded-[10px] bg-[#FF5C5C] px-5 text-white text-lg font-bold flex items-center justify-center gap-3"
          onClick={() => {
            setToggleMnemonic(false);
            setTogglePrivateKey(true);
            setTimeout(() => {
              setTogglePrivateKey(false);
            }, 10000);
          }}
        >
          <KeyIcon className="w-6 h-6" />
          Show Private Key
        </button>

        {togglePrivateKey && (
          <div
            className="flex items-center justify-center gap-4 bg-white/90 border-red-900 border-[1px] border-dashed text-center rounded-xl h-[100px] p-10 w-[80%] relative group"
            style={{
              wordBreak: "break-all",
            }}
          >
            <div className="h-full w-full rounded-[8px] backdrop-filter backdrop-blur-sm absolute flex justify-center items-center group-hover:-z-10 z-10">
              <EyeIcon className="w-10 h-10 text-black" />
            </div>
            {bs58.encode(
              Keypair.fromSeed(bip39.mnemonicToSeedSync(mnemonics).slice(0, 32))
                .secretKey
            )}
          </div>
        )}
      </div>
    </div>
  );
}
