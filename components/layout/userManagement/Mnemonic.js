"use client";

import { useSelector } from "react-redux";

import useToast from "@/hooks/useToast";

import { Tooltip } from "@material-tailwind/react";

const Mnemonic = () => {
  const mnemonic = useSelector((state) => state.wallet.mnemonics);
  const { Success } = useToast();

  const handleCopyText = () => {
    event.preventDefault();
    navigator.clipboard.writeText(mnemonic);
    Success("Security phase copied");
  };

  return (
    <>
      <Tooltip
        content="Copy Security Phase"
        offset={8}
        className="bg-primary-black text-primary-white px-5 py-2"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 22 },
        }}
      >
        <section
          className="grid grid-cols-3 grid-rows-4 gap-5 w-full cursor-copy mb-4"
          onClick={handleCopyText}
        >
          {mnemonic.split(" ").map((word, index) => (
            <div
              key={index}
              className="flex flex-start font-medium text-primary-black text-base py-1 px-3 w-full bg-primary-white/60 rounded"
            >
              {word}
            </div>
          ))}
        </section>
      </Tooltip>

      <button
        className="text-primary-black underline cursor-copy font-medium w-full text-center"
        onClick={handleCopyText}
      >
        Copy Text to Clipboard
      </button>
    </>
  );
};
export default Mnemonic;
