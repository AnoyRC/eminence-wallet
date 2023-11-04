"use client";

import { useState, useEffect } from "react";
import localFont from "next/font/local";
import { useSelector } from "react-redux";
import { Input, Select, Option, Button } from "@material-tailwind/react";

import useLogin from "@/hooks/useLogin";

import LoadingAnimation from "@/components/LoadingAnimation";
import useToast from "@/hooks/useToast";
import useTransfer from "@/hooks/useTransfer";
import useGetServer from "@/hooks/useGetServer";

const myFont = localFont({
  src: "../../../../public/fonts/Satoshi-Variable.woff2",
});

const ProfilePay = ({ user }) => {
  const [amount, setAmount] = useState("0.00");
  const [currencyType, setCurrencyType] = useState("SOL");

  const { checkLogin } = useLogin();
  const mnemonics = useSelector((state) => state.wallet.mnemonics);
  const { Error } = useToast();
  const { transfer, transferToken } = useTransfer();
  const { getUserSelf } = useGetServer();

  const handleClick = async () => {
    if (!checkLogin()) return;

    if (!amount || amount === "" || Number(amount) === 0) {
      return Error("Please enter a valid amount");
    }

    if (currencyType === "SOL") {
      const res = await transfer(amount, user.pubkey);
      if (res) setAmount("0.00");
    }

    if (currencyType === "USDC") {
      const res = await transferToken(amount, user.pubkey);
      if (res) setAmount("0.00");
    }
  };

  const handleChange = (e) => {
    if (e.target.value === "") setAmount(0);
    const regex = new RegExp("^[0-9]*[.]{0,1}[0-9]{0,4}$");
    if (regex.test(e.target.value)) setAmount(e.target.value);
  };

  useEffect(() => {
    if (mnemonics) {
      getUserSelf();
    }
  }, [mnemonics]);

  return user ? (
    <section>
      <h2 className="text-3xl text-primary-white font-bold mb-10">{`Pay to ${user.firstName} ${user.lastName}`}</h2>

      <div className="flex flex-col gap-5">
        <Select
          label="Select Type"
          className={
            "border-b-white border-x-white text-white mb-10 " + myFont.className
          }
          labelProps={{
            className: "before:border-white after:border-white text-white",
          }}
          value={currencyType}
          onChange={(e) => setCurrencyType(e)}
        >
          <Option value="SOL">SOL</Option>
          <Option value="USDC">USDC</Option>
        </Select>

        <Input
          type="text"
          label="Amount"
          color="white"
          value={amount}
          onChange={handleChange}
        />

        <Button
          className={
            " bg-gradient-to-r from-[#26FFFF] to-[#4AFF93]  w-full flex flex-row  text-black items-center justify-center text-[14px] font-bold rounded-[8px] mt-5"
          }
          style={{
            textTransform: "none",
          }}
          onClick={handleClick}
        >
          Pay Now
        </Button>
      </div>
    </section>
  ) : (
    <LoadingAnimation width={"w-full max-w-xs"} height={"h-fit"} size={100} />
  );
};

export default ProfilePay;
