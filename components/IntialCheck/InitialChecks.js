"use client";

import useBalance from "@/hooks/useBalance";
import useGetServer from "@/hooks/useGetServer";
import useLiveGraph from "@/hooks/useLiveGraph";
import useLogin from "@/hooks/useLogin";
import useTransaction from "@/hooks/useTransaction";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { configureAbly } from "@ably-labs/react-hooks";
import { setHistory } from "@/redux/graphSlice";

export default function IntialChecks({ children }) {
  const { checkLogin } = useLogin();
  const { getUserSelf } = useGetServer();
  const mnemonics = useSelector((state) => state.wallet.mnemonics);
  const { balanceListener, getBalance, getBalanceUSDC } = useBalance();
  const connection = useSelector((state) => state.profile.connection);
  const { FetchWeekHistory } = useLiveGraph();
  const { getAllTransactions } = useTransaction();
  const [channels, setChannels] = useState();
  const [channel, setChannel] = useState(new Map());
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);
  const value = useSelector((state) => state.graph.value);

  //Login Check
  useEffect(() => {
    checkLogin();
  }, []);

  //User Check
  useEffect(() => {
    if (mnemonics) {
      getUserSelf();
    }
  }, [mnemonics]);

  //Balance Check
  useEffect(() => {
    if (mnemonics) {
      getAllTransactions();
      getBalance();
      getBalanceUSDC();
      balanceListener();
    }
  }, [mnemonics, connection]);

  //Fetch Week Stats
  useEffect(() => {
    FetchWeekHistory();
  }, [mnemonics]);

  useEffect(() => {
    if (user) {
      const ably = configureAbly({
        authUrl: `${process.env.NEXT_PUBLIC_NEXT_URL}/api/ably/auth?id=${user._id}`,
      });

      const channel1m = ably.channels.get("1m", {
        params: { rewind: "1m" },
      });

      const channel15m = ably.channels.get("15m", {
        params: { rewind: "1m" },
      });

      const channel1h = ably.channels.get("1h", {
        params: { rewind: "1m" },
      });

      const channel1d = ably.channels.get("1d", {
        params: { rewind: "1m" },
      });

      const channel1w = ably.channels.get("1w", {
        params: { rewind: "1m" },
      });

      setChannels(
        new Map([
          ["1m", channel1m],
          ["15m", channel15m],
          ["1h", channel1h],
          ["1d", channel1d],
          ["1w", channel1w],
        ])
      );

      channel1m.subscribe((result) => {
        const data = result.data.map((item) => {
          return {
            ticker: Number(item[1]).toFixed(2),
            date:
              new Date(item[0]).getDate() +
              "/" +
              new Date(item[0]).getMonth() +
              "/" +
              new Date(item[0]).getFullYear(),
            time: new Date(item[0]).toLocaleTimeString(),
          };
        });
        dispatch(setHistory(data));
      });

      setChannel(channel1m);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (channel) {
        channel.unsubscribe();
      }

      setChannel(channels.get(value));

      channels.get(value).history(function (err, data) {
        const result = data.items[0].data;

        const response = result.map((item) => {
          return {
            ticker: Number(item[1]).toFixed(2),
            date:
              new Date(item[0]).getDate() +
              "/" +
              new Date(item[0]).getMonth() +
              "/" +
              new Date(item[0]).getFullYear(),
            time: new Date(item[0]).toLocaleTimeString(),
          };
        });
        dispatch(setHistory(response));
      });

      channels.get(value).subscribe((result) => {
        const data = result.data.map((item) => {
          return {
            ticker: Number(item[1]).toFixed(2),
            date:
              new Date(item[0]).getDate() +
              "/" +
              new Date(item[0]).getMonth() +
              "/" +
              new Date(item[0]).getFullYear(),
            time: new Date(item[0]).toLocaleTimeString(),
          };
        });
        dispatch(setHistory(data));
      });
    }
  }, [value]);

  return <>{children}</>;
}
