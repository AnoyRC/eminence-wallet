"use client";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Checkbox,
} from "@material-tailwind/react";
import localFont from "next/font/local";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

const myFont = localFont({
  src: "../../../../public/fonts/Satoshi-Variable.woff2",
});

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TransactionTab from "./TransactionTab";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import useTransaction from "@/hooks/useTransaction";
import { removeAllTransactions } from "@/redux/profileSlice";
import Image from "next/image";

const TABLE_HEAD = ["Name", "Amount", "Date", "Type", "TxID"];

export default function TransactionV2({ limit = 5 }) {
  const [isClient, setIsClient] = useState(false);
  const transactions = useSelector((state) => state.profile.transactions);
  const { getAllTransactions } = useTransaction();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className="h-fit w-full rounded-[8px] p-[0.5px]"
      style={{
        background: "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
      }}
    >
      <Card className={"h-full w-full rounded-[8px] bg-black"}>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none bg-black"
        >
          <div className="flex items-center justify-between">
            <div className=" flex flex-col justify-between gap-8 pb-3">
              <div>
                <Typography
                  variant="h5"
                  color="white"
                  className={myFont.className}
                >
                  {limit === 5
                    ? "Recent Transactions"
                    : "Cash out Transactions"}
                </Typography>
                <Typography
                  color="white"
                  className={"mt-1 font-normal " + myFont.className}
                >
                  These are details about the last transactions
                </Typography>
              </div>
            </div>
            <button
              className="flex items-center justify-center rounded-full px-2 py-2"
              style={{
                background:
                  "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
              }}
              onClick={() => {
                dispatch(removeAllTransactions());
                getAllTransactions();
              }}
            >
              <ArrowPathIcon className="h-4 w-4 text-black" />
            </button>
          </div>
        </CardHeader>

        {transactions.length === 0 && (
          <div className="flex items-center justify-center rounded-[8px] mt-2">
            <div className="w-full h-[300px] rounded-[8px] bg-[#1c1d22] z-10 flex flex-col justify-center items-center">
              <Image src="/images/logo.png" alt="logo" width={50} height={50} />

              <h3 className="text-primary-white font-bold text-2xl leading-normal">
                Eminence
              </h3>

              <p className="text-primary-white max-w-xs text-center">
                No transactions to show
              </p>
            </div>
          </div>
        )}

        {transactions.length > 0 && (
          <CardBody className="p-2 px-0">
            <table className="w-full table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="border-y border-white bg-[#1C1D22] p-4 hover:bg-[#1C1D22]/50 cursor-pointer"
                    >
                      <Typography
                        variant="small"
                        color="white"
                        className={
                          "flex items-center justify-between font-normal leading-none opacity-70 " +
                          myFont.className
                        }
                      >
                        {head}
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 &&
                  transactions.slice(0, limit).map((transaction, index) => {
                    return (
                      <TransactionTab
                        key={transaction.txId}
                        transaction={transaction}
                        length={transactions.length}
                        index={index}
                      />
                    );
                  })}
              </tbody>
            </table>
          </CardBody>
        )}
      </Card>
    </div>
  );
}
