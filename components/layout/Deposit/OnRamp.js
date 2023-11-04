"use client";
import { Button, Option, Select } from "@material-tailwind/react";
import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import useDeposit from "@/hooks/useDeposit";
import useToast from "@/hooks/useToast";

const myFont = localFont({
  src: "../../../public/fonts/Satoshi-Variable.woff2",
});

const currency = [
  {
    name: "Indian Rupees",
    symbol: "INR",
    image: "/images/Deposit/Ind.svg",
    fiatType: "1",
  },
  {
    name: "Mexican Peso",
    symbol: "MXN",
    image: "/images/Deposit/mexico.svg",
    fiatType: "4",
  },
  {
    name: "Nigerian Naira",
    symbol: "NGN",
    image: "/images/Deposit/Nigeria.svg",
    fiatType: "6",
  },
  {
    name: "Turkish Lira",
    symbol: "TRY",
    image: "/images/Deposit/Turkey.svg",
    fiatType: "2",
  },
  {
    name: "UAE Dirham",
    symbol: "AED",
    image: "/images/Deposit/uae.svg",
    fiatType: "3",
  },
  {
    name: "Vietnamese Dong",
    symbol: "VND",
    image: "/images/Deposit/Viet.svg",
    fiatType: "5",
  },
];

const cryptoCurrency = [
  {
    name: "Solana",
    symbol: "SOL",
    image: "/images/Dashboard/AsideContainer/SOL.svg",
    coinCode: "sol",
  },
  {
    name: "USDC",
    symbol: "USDC",
    image: "/images/Dashboard/AsideContainer/USDC.svg",
    coinCode: "usdc",
  },
];

export default function OnRamp() {
  const [selectedCurrency, setSelectedCurrency] = useState("1");
  const [selectedCryptoCurrency, setSelectedCryptoCurrency] = useState("sol");
  const [fiatAmount, setFiatAmount] = useState(0);
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const { initiateOnramp, fetchConversion } = useDeposit();
  const { Error } = useToast();

  useEffect(() => {
    const fetch = async () => {
      const cryptoAmount = await fetchConversion(
        selectedCryptoCurrency,
        selectedCurrency,
        fiatAmount
      );

      setCryptoAmount(cryptoAmount);
    };

    fetch();
  }, [selectedCurrency, selectedCryptoCurrency]);

  return (
    <div
      className="w-full rounded-[8px] p-[0.5px]"
      style={{
        background: "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
      }}
    >
      <div className=" h-full w-full flex flex-col gap-[20px] bg-black rounded-[8px] p-5">
        <div
          className="flex flex-row items-center p-4 pr-1 gap-[5px] w-fit rounded-[8px] "
          style={{
            background:
              "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
          }}
        >
          <p className="text-black">Powered by</p>
          <Image
            src="/images/Deposit/OnRampLogo.svg"
            width={100}
            height={30}
            alt="OnRamp Logo"
          ></Image>
        </div>

        <h3 className="text-white text-2xl font-semibold">Enter Amount</h3>

        <div
          className="flex items-center w-full rounded-[8px] h-[65px]"
          style={{
            background:
              "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
          }}
        >
          <input
            className="w-full h-full bg-transparent text-black text-3xl p-2 font-bold placeholder:text-black outline-none"
            type="text"
            placeholder="0.0"
            value={fiatAmount}
            onChange={(e) => setFiatAmount(e.target.value)}
          ></input>

          <vr className="h-[40px] w-[3px] bg-black"></vr>

          <Select
            className="border-transparent h-full text-black"
            labelProps={{
              className: "after:border-transparent before:border-transparent",
            }}
            containerProps={{
              className: "max-w-[200px]",
            }}
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e)}
          >
            {currency.map((item) => (
              <Option value={item.fiatType} key={item.symbol}>
                <div
                  className={"flex items-center gap-[10px] " + myFont.className}
                >
                  <Image
                    src={item.image}
                    width={35}
                    height={35}
                    alt="INR Logo"
                  ></Image>
                  <div className="flex flex-col gap-[3px] justify-center h-full">
                    <p className="text-black font-bold">{item.name}</p>
                    <p className="text-black text-sm">{item.symbol}</p>
                  </div>
                </div>
              </Option>
            ))}
          </Select>
        </div>

        <h3 className="text-white text-2xl font-semibold">
          You Will Receive (Approx.)
        </h3>

        <div
          className="flex items-center w-full rounded-[8px] h-[65px]"
          style={{
            background:
              "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
          }}
        >
          <p className="w-full bg-transparent text-black text-3xl p-2 font-bold placeholder:text-black outline-none">
            {fiatAmount
              ? Math.trunc(fiatAmount / cryptoAmount).toString() +
                "." +
                (fiatAmount / cryptoAmount).toString().split(".")[1].slice(0, 2)
              : 0}
          </p>

          <vr className="h-[40px] w-[3px] bg-black"></vr>

          <Select
            className="border-transparent h-full text-black"
            labelProps={{
              className: "after:border-transparent before:border-transparent",
            }}
            containerProps={{
              className: "max-w-[200px]",
            }}
            value={selectedCryptoCurrency}
            onChange={(e) => setSelectedCryptoCurrency(e)}
          >
            {cryptoCurrency.map((item) => (
              <Option value={item.coinCode} key={item.symbol}>
                <div
                  className={"flex items-center gap-[10px] " + myFont.className}
                >
                  <Image
                    src={item.image}
                    width={35}
                    height={35}
                    alt="INR Logo"
                  ></Image>
                  <div className="flex flex-col gap-[3px] justify-center h-full">
                    <p className="text-black font-bold">{item.name}</p>
                    <p className="text-black text-sm">{item.symbol}</p>
                  </div>
                </div>
              </Option>
            ))}
          </Select>
        </div>

        <Button
          className={
            "bg-white flex items-center justify-center text-white text-2xl w-full h-[65px] rounded-[8px] font-normal mt-3 hover:cursor-pointer " +
            myFont.className
          }
          style={{
            textTransform: "none",
          }}
          onClick={() => {
            if (Number(fiatAmount) <= 0) {
              Error("Please enter a valid amount");
              return;
            }
            initiateOnramp(
              selectedCryptoCurrency,
              selectedCurrency,
              Number(fiatAmount)
            );
          }}
        >
          <div className="flex flex-row items-center p-4 pr-1 gap-[5px] w-fit rounded-[8px]">
            <p className="text-black">Proceed with</p>

            <Image
              src="/images/Deposit/OnRampLogo.svg"
              width={100}
              height={30}
              alt="OnRamp Logo"
            ></Image>
          </div>
        </Button>
      </div>
    </div>
  );
}
