"use client";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Option, Select } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useLiveGraph from "@/hooks/useLiveGraph";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setValue } from "@/redux/graphSlice";

const myFont = localFont({
  src: "../../../../public/fonts/Satoshi-Variable.woff2",
});

const Graph = () => {
  const value = useSelector((state) => state.graph.value);
  const history = useSelector((state) => state.graph.history);
  const dispatch = useDispatch();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="bg-[#1C1D22] w-full px-5 py-5 rounded-xl text-[16px] flex flex-col gap-[20px]"
          style={{
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex gap-[10px] items-center">
            <div
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
              }}
            >
              <Image
                src="/images/Dashboard/AsideContainer/SOL.svg"
                width={20}
                height={20}
                alt="solana"
              />
            </div>

            <div className="flex flex-col gap-[2px]">
              {history.length > 0 && (
                <h1 className="text-white text-[16px] font-bold">
                  {payload[0].value}
                </h1>
              )}
              {history.length > 0 && (
                <h1
                  className="text-[12px]"
                  style={{
                    color:
                      ((payload[0].value - history[0].ticker) /
                        history[0].ticker) *
                        100 >
                      0
                        ? "#4AFF93"
                        : "#FF4A4A",
                  }}
                >
                  {((payload[0].value - history[0].ticker) /
                    history[0].ticker) *
                    100 >
                  0
                    ? "+"
                    : "-"}
                  {Math.abs(
                    (
                      ((payload[0].value - history[0].ticker) /
                        history[0].ticker) *
                      100
                    ).toFixed(2)
                  )}
                  % <span className="text-[#f0f0f099]">vs. {value}</span>
                </h1>
              )}
            </div>
          </div>
          <div className="text-[12px]">
            <p className="text-white font-bold">{`${payload[0].payload.date}`}</p>
            <p className="text-white font-bold">{`${payload[0].payload.time}`}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className="w-full h-[270px] p-[0.5px] rounded-[8px]"
      style={{
        background: "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="flex flex-col bg-[#000000] rounded-[8px] w-full h-full overflow-hidden">
        <div className="flex w-full justify-between items-center px-[20px] h-[64px] rounded-t-[8px] border-b-[1px] border-dashed border-white">
          <div className="flex gap-[10px] items-center">
            <div
              className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
              }}
            >
              <Image
                src="/images/Dashboard/AsideContainer/SOL.svg"
                width={20}
                height={20}
                alt="solana"
              />
            </div>

            <div className="flex flex-col gap-[2px]">
              {history.length > 0 && (
                <h1 className="text-white text-[16px] font-bold">
                  {history[history.length - 1].ticker}
                </h1>
              )}
              {history.length > 0 && (
                <h1
                  className="text-[12px]"
                  style={{
                    color:
                      ((history[history.length - 1].ticker -
                        history[0].ticker) /
                        history[0].ticker) *
                        100 >
                      0
                        ? "#4AFF93"
                        : "#FF4A4A",
                  }}
                >
                  {((history[history.length - 1].ticker - history[0].ticker) /
                    history[0].ticker) *
                    100 >
                  0
                    ? "+"
                    : "-"}
                  {Math.abs(
                    (
                      ((history[history.length - 1].ticker -
                        history[0].ticker) /
                        history[0].ticker) *
                      100
                    ).toFixed(2)
                  )}
                  % <span className="text-[#f0f0f099]">vs. {value}</span>
                </h1>
              )}
            </div>
          </div>

          <div className="flex  items-center">
            <CalendarDaysIcon className="w-[20px] h-[20px] text-white" />
            <Select
              variant="outlined"
              label=""
              className={
                "border-transparent text-white w-[80px] " + myFont.className
              }
              labelProps={{
                className: "before:border-transparent after:border-transparent",
              }}
              containerProps={{
                className: "min-w-[50px]",
              }}
              onChange={(e) => {
                dispatch(setValue(e));
              }}
              value={value}
            >
              <Option value="1m">1m</Option>
              <Option value="15m">15m</Option>
              <Option value="1h">1h</Option>
              <Option value="1d">1d</Option>
              <Option value="1w">7d</Option>
            </Select>
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center h-[206px]">
          {history && history.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={history}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#26FFFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4AFF93" stopOpacity={0.8} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <Tooltip content={<CustomTooltip />} />

                <YAxis
                  domain={
                    value === "1m"
                      ? ["dataMin + 0.1", "dataMax + 0.1"]
                      : value === "15m"
                      ? ["dataMin + 0.3", "dataMax + 0.3"]
                      : value === "1h"
                      ? ["dataMin + 0.7", "dataMax + 0.7"]
                      : value === "1d"
                      ? ["dataMin + 2", "dataMax + 2"]
                      : ["dataMin + 6", "dataMax + 6"]
                  }
                  hide
                />
                <Area
                  type="monotone"
                  dataKey="ticker"
                  stroke="#4AFF93"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Graph;
