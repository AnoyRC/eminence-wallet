import { ArrowUpRightIcon } from "@heroicons/react/24/solid";

export default function GradientButton2({ label, onClick }) {
  return (
    <button
      className="rounded-full bg-transparent bg-gradient-to-r h-[45px] p-0.5 from-[#4AFF93] to-[#26FFFF] w-full text-black text-[16px] font-bold flex justify-center items-center gap-[10px]    
        "
    >
      {label} <ArrowUpRightIcon className="w-[15px] h-[15px] -mb-0.5" />
    </button>
  );
}
