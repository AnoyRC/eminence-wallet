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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetServer from "@/hooks/useGetServer";
import Avatar, { genConfig } from "react-nice-avatar";

const myFont = localFont({
  src: "../../../../public/fonts/Satoshi-Variable.woff2",
});

export default function TransactionTab({ transaction, length, index }) {
  const isLast = index === length - 1;
  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  const [currentUser, setCurrentUser] = useState(null);
  const user = useSelector((state) => state.profile.user);
  const { getUserByPubkey } = useGetServer();
  const [isClient, setIsClient] = useState(false);
  const cluster = useSelector((state) => state.profile.connection);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    try {
      if (transaction.sender == user.pubkey) {
        getUserByPubkey(transaction.recipient).then((res) => {
          setCurrentUser(res);
        });
      } else {
        if (user.pubkey == transaction.sender) {
          setCurrentUser(user);
        } else {
          getUserByPubkey(transaction.sender).then((res) => {
            setCurrentUser(res);
          });
        }
      }
    } catch (e) {}
  }, []);

  return (
    <tr key={transaction.txId}>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Avatar
            style={{ width: "2rem", height: "2rem" }}
            {...genConfig(
              transaction.isVoucher || transaction.isSwap
                ? user.avatarId
                : currentUser
                ? currentUser.avatarId
                : "unknown"
            )}
            className=""
          />
          <Typography
            variant="small"
            color="white"
            className={"font-bold " + myFont.className}
          >
            {transaction.isVoucher || transaction.isSwap
              ? user.firstName
              : currentUser
              ? currentUser.firstName
              : transaction.sender === user.pubkey
              ? transaction.recipient.toString().substring(0, 3) +
                "..." +
                transaction.recipient
                  .toString()
                  .substring(transaction.recipient.toString().length - 3)
              : transaction.sender.toString().substring(0, 3) +
                "..." +
                transaction.sender
                  .toString()
                  .substring(transaction.sender.toString().length - 3)}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <Typography
          variant="small"
          color="white"
          className={"font-normal " + myFont.className}
        >
          {Number(transaction.amount).toFixed(2)} {transaction.currency}
        </Typography>
      </td>
      <td className={classes}>
        {isClient && (
          <Typography
            variant="small"
            color="white"
            className={"font-normal  " + myFont.className}
          >
            {new Date(transaction.date).getDate() +
              " " +
              new Date(transaction.date).toLocaleString("default", {
                month: "long",
              }) +
              " " +
              new Date(transaction.date).getFullYear()}
          </Typography>
        )}
        {isClient && (
          <Typography
            variant="small"
            color="white"
            className={"font-normal  " + myFont.className}
          >
            {new Date(transaction.date).toLocaleTimeString()}
          </Typography>
        )}
      </td>
      <td className={classes}>
        <div className="w-max">
          <Chip
            size="sm"
            variant="filled"
            value={
              transaction.isSwap
                ? "swap"
                : transaction.isVoucher
                ? "voucher"
                : transaction.sender === user.pubkey.toString()
                ? "send"
                : "receive"
            }
            color={
              transaction.isSwap
                ? "orange"
                : transaction.isVoucher
                ? "purple"
                : transaction.sender === user.pubkey.toString()
                ? "red"
                : "green"
            }
          />
        </div>
      </td>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <div
            className="w-max hover:cursor-pointer hover:underline"
            onClick={() => {
              if (cluster !== "https://api.devnet.solana.com") {
                window.open(
                  `https://explorer.solana.com/tx/${transaction.txId}`
                );
              } else {
                window.open(
                  `https://explorer.solana.com/tx/${transaction.txId}?cluster=devnet`
                );
              }
            }}
          >
            {transaction.txId.toString().substring(0, 4) +
              "..." +
              transaction.txId
                .toString()
                .substring(transaction.txId.toString().length - 4)}
          </div>
        </div>
      </td>
    </tr>
  );
}
