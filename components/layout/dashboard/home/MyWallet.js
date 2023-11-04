"use client";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import localFont from "next/font/local";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const myFont = localFont({
  src: "../../../../public/fonts/Satoshi-Variable.woff2",
});

const MyWallet = () => {
  const [activeTab, setActiveTab] = useState("Sol");
  const balance = useSelector((state) => state.profile.balance);
  const balanceUSDC = useSelector((state) => state.profile.balanceUSDC);
  const weekStat = useSelector((state) => state.graph.weekStat);
  const router = useRouter();

  const data = [
    {
      id: 1,
      label: "Sol",
      value: "Sol",
      amount: balance,
      changeValue: weekStat
        ? weekStat[6].ticker > weekStat[0].ticker
          ? "+" +
            Math.trunc(
              ((weekStat[6].ticker - weekStat[0].ticker) / weekStat[0].ticker) *
                100
            ) +
            "." +
            (
              ((weekStat[6].ticker - weekStat[0].ticker) / weekStat[0].ticker) *
              100
            )
              .toString()
              .split(".")[1]
              .substring(0, 2)
          : "-" +
            Math.trunc(
              ((weekStat[6].ticker - weekStat[0].ticker) / weekStat[0].ticker) *
                100
            ) +
            "." +
            (
              ((weekStat[6].ticker - weekStat[0].ticker) / weekStat[0].ticker) *
              100
            )
              .toString()
              .split(".")[1]
              .substring(0, 2) +
            "%"
        : "0.00%",
    },
    {
      id: 2,
      label: "USDC",
      value: "USDC",
      amount: balanceUSDC,
      changeValue: "+27.14",
    },
  ];

  return (
    <Tabs
      value={activeTab}
      className="flex  flex-col w-[310px] h-[230px] bg-gradient-to-r from-[#4AFF93] to-[#26FFFF]  rounded-lg px-[20px] pt-[20px] gap-[24px]"
    >
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-[14px]">My Wallet</h1>
        <div className=" w-[168px] rounded-full">
          <TabsHeader
            className="rounded-full bg-[#1C1D22] text-white w-full h-[32px] bg-opacity-100"
            indicatorProps={{
              className:
                "rounded-full bg-gradient-to-r from-[#4AFF93] to-[#26FFFF]",
            }}
          >
            {data.map(({ label, value, id }) => (
              <Tab
                key={id}
                value={value}
                onClick={() => setActiveTab(value)}
                className={
                  activeTab === value
                    ? "text-black transition-colors duration-300 flex justify-center items-center"
                    : "text-white transition-colors duration-300 flex justify-center items-center"
                }
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </div>
      </div>
      <div className="flex flex-col items-center gap-[24px]">
        <TabsBody className="">
          {data.map(({ amount, changeValue, value, id }) => (
            <TabPanel
              key={id}
              value={value}
              className={
                "p-1 h-full flex flex-col items-center justify-center " +
                myFont.className
              }
            >
              <div className="text-[48px] font-bold text-primary-black relative leading-10">
                <span className="text-[48px] font-bold">
                  {Math.trunc(amount) >= 1000
                    ? Math.trunc(amount / 1000).toString() + "K"
                    : Math.trunc(amount) >= 1000000
                    ? Math.trunc(amount / 1000000).toString() + "M"
                    : Math.trunc(amount)}
                  {amount < 100 && amount.toString().split(".")[1] && "."}
                </span>
                <span className="text-[32px] font-bold">
                  {amount > 0 &&
                    amount < 100 &&
                    Math.trunc(amount) / amount !== 1 &&
                    amount.toString().split(".")[1].substring(0, 2)}
                </span>
                <span> {value}</span>
              </div>
              <p className="text-[14px] font-bold">
                {value === "Sol" ? (
                  <>
                    {changeValue}

                    <span className="tex-[12px] font-medium ml-[4px]">
                      {" "}
                      Last Week
                    </span>
                  </>
                ) : (
                  <>Stable Coin</>
                )}
              </p>
            </TabPanel>
          ))}
        </TabsBody>
        <div className="flex items-center justify-center w-full">
          <Button
            className=" bg-primary-black  w-full flex flex-row  text-primary-white items-center justify-center text-[14px] font-bold rounded-full"
            href=""
            style={{
              textTransform: "none",
            }}
            onClick={() => router.push("/deposit")}
          >
            Buy
            <span>
              <ArrowUpRightIcon className="h-4 w-4 ml-2 text-primary-white" />
            </span>
          </Button>
        </div>
      </div>
    </Tabs>
  );
};

export default MyWallet;
