"use client";

import { useState } from "react";

import { ConfirmSecurityBtn } from "./FormBtn";
import { ImportWalletBtn } from "../routes/FormBtn";

const SecurityInput = ({ importWallet }) => {
  const phrase =
    "Secret1 Secret2 Secret3 Secret4 Secret5 Secret6 Secret7 Secret8 Secret9 Secret10 Secret11 Secret12";

  const [inputMnemonic, setInputMnemonic] = useState(Array(12).fill(""));

  const handleInputChange = (event, index) => {
    const newMnemonic = [...inputMnemonic];
    newMnemonic[index] = event.target.value.trim();
    setInputMnemonic(newMnemonic);
  };

  return (
    <>
      <section className="grid grid-cols-3 grid-rows-4 gap-5 w-full mb-8">
        {phrase.split(" ").map((word, index) => (
          <input
            key={index}
            className={`font-medium text-black text-base px-3 py-1 bg-primary-white/60 rounded disabled:opacity-50 border-2 transition-colors ${
              inputMnemonic[index].length > 0
                ? "border-primary-black/70"
                : "border-red-500/70"
            }`}
            placeholder={word}
            onChange={(event) => handleInputChange(event, index)}
            disabled={
              index > 0 && inputMnemonic[index - 1] === "" ? true : false
            }
          ></input>
        ))}
      </section>

      {importWallet ? (
        <ImportWalletBtn inputMnemonic={inputMnemonic} />
      ) : (
        <ConfirmSecurityBtn inputMnemonic={inputMnemonic} />
      )}
    </>
  );
};

export default SecurityInput;
