"use client";

import { ArrowPathIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { setFile } from "@/redux/fileSlice";
import { setImage } from "@/redux/fileSlice";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import useCreateWallet from "@/hooks/useCreateWallet";

export default function ImageInput() {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.file.image);
  const router = useRouter();
  const { createWalletWithImage } = useCreateWallet();
  const file = useSelector((state) => state.file.file);

  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/webp"
    ) {
      dispatch(setFile(file));
      dispatch(setImage(URL.createObjectURL(file)));
    }
  };

  const revert = (e) => {
    e.preventDefault();

    dispatch(setFile(null));
    dispatch(setImage(null));
  };

  return (
    <div className="mb-8 w-full flex flex-col items-center">
      <div className="w-full h-[260px]">
        {!image ? (
          <div className="bg-white/60 w-full h-[200px] rounded-[8px] border-[2px] border-black border-dashed relative">
            <PhotoIcon className="h-10 w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <input
              type="file"
              className="w-full h-full opacity-0"
              onChange={(e) => onFileChange(e)}
            />
          </div>
        ) : (
          <div className="w-full h-[200px] rounded-[8px] border-[2px] border-black border-dashed relative overflow-hidden bg-white/60">
            <Image
              src={image}
              alt="image"
              width={200}
              height={200}
              className="w-full h-[200px] object-contain rounded-[8px] "
            />
            <button
              className="bg-white text-black p-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100 "
              onClick={(e) => revert(e)}
            >
              <ArrowPathIcon className="h-5 w-5 " />
            </button>
          </div>
        )}

        <Button
          label="Import Image"
          fullWidth
          color="bg-primary-black text-primary-white"
          style="font-bold text-base rounded-lg py-3 mt-4"
          onClick={async (e) => {
            e.preventDefault();
            await createWalletWithImage();
            if (!file) return;
            router.push("/newPassword");
          }}
        />

        <button
          className="text-primary-black text-md w-full underline font-medium text-center mt-2"
          onClick={(e) => {
            e.preventDefault();
            router.push("/importWallet");
          }}
        >
          Import Mnemonic Phrase instead
        </button>
      </div>
    </div>
  );
}
