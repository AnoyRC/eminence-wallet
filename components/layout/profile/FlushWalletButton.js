"use client";
import { reset } from "@/redux/defaultSlice";
import { setMnemonics, setPubKey } from "@/redux/walletSlice";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function FlushWalletButton() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div
      className="bg-[#FF5C5C] border-white text-center rounded-[8px] border-[2px] p-5 text-white text-xl font-bold flex items-center justify-center gap-3  border-dashed hover:cursor-pointer"
      onClick={() => {
        dispatch(setMnemonics(""));
        dispatch(setPubKey(""));
        localStorage.removeItem("token");
        localStorage.removeItem("secret");
        dispatch(reset());
        router.push("/onboard");
      }}
    >
      <TrashIcon className="w-6 h-6" />
      Flush Wallet
    </div>
  );
}
