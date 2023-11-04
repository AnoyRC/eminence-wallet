"use client";

import {
  GiftIcon,
  ChevronRightIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const DashboardBtn = () => {
  const router = useRouter();
  const user = useSelector((state) => state.profile.user);

  return (
    <section className="flex flex-col gap-[8px] w-[46%]">
      <button
        className="bg-black/40 text-primary-white flex justify-between items-center p-4 py-[8px] shadow shadow-primary-white/20 rounded-lg hover:opacity-90 hover:scale-105 transition-[opacity,transform] flex-1"
        onClick={() => {
          router.push("/myVouchers");
        }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-priamry rounded-md">
            <GiftIcon className="w-5 h-5 text-primary-black" />
          </div>

          <p className="text-primary-white font-bold ">Create Voucher</p>
        </div>

        <ChevronRightIcon
          className="w-5 h-5 text-primary-white ml-5
        "
        />
      </button>

      <button
        className="bg-black/40 text-primary-white flex justify-between items-center p-4 py-[8px] shadow shadow-primary-white/20 rounded-lg hover:opacity-90 hover:scale-105 transition-[opacity,transform] flex-1"
        onClick={() => {
          router.push("/contacts");
        }}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-priamry rounded-md">
            <UserIcon className="w-5 h-5 text-primary-black" />
          </div>

          <p className="text-primary-white font-bold ">Your Contacts</p>
        </div>

        <ChevronRightIcon
          className="w-5 h-5 text-primary-white ml-5
        "
        />
      </button>

      <button
        className="bg-black/40 text-primary-white flex justify-between items-center p-4 py-[8px] shadow shadow-primary-white/20 rounded-lg hover:opacity-90 hover:scale-105 transition-[opacity,transform] flex-1"
        onClick={() => {
          router.push(`/profile/${user?.pubkey}`);
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="p-3 bg-gradient-priamry rounded-md">
            <UserCircleIcon className="w-5 h-5 text-primary-black" />
          </div>

          <p className="text-primary-white font-bold ">Check Profile Card</p>
        </div>

        <ChevronRightIcon
          className="w-5 h-5 text-primary-white ml-5
        "
        />
      </button>
    </section>
  );
};

export default DashboardBtn;
