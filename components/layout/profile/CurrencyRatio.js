"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import Image from "next/image";

export default function CurrencyRatio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const balance = useSelector((state) => state.profile.balance);
  const balanceUSDC = useSelector((state) => state.profile.balanceUSDC);

  const data = [
    {
      name: "SOL",
      value: balance === balanceUSDC && balance === 0 ? 75 : balance,
    },
    {
      name: "USDC",
      value: balance === balanceUSDC && balance === 0 ? 25 : balanceUSDC,
    },
  ];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        {/* <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#fff"
          className="text-[10px]"
        >{`${
          balance === balanceUSDC && balance === 0
            ? 0
            : `${
                Math.trunc(value) >= 1000
                  ? Math.trunc(value / 1000).toString() + "K"
                  : Math.trunc(value) >= 1000000
                  ? Math.trunc(value / 1000000).toString() + "M"
                  : Math.trunc(value)
              }${
                value < 100 ? (value.toString().split(".")[1] ? "." : "") : ""
              }${
                value < 100
                  ? value > 0
                    ? value.toString().split(".")[1].substring(0, 2)
                    : ""
                  : ""
              }`
        } ${payload.name}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#fff"
          className="text-[10px] opacity-60"
        >
          {` ${(percent * 100).toFixed(2)}%`}
        </text> */}
      </g>
    );
  };

  return (
    <div
      className="w-[310px] h-[230px] p-[1px] rounded-[8px] relative"
      style={{
        background: "linear-gradient(180deg, #4AFF93 0%, #26FFFF 100%)",
      }}
    >
      <div className="w-full h-full bg-black flex items-center justify-center rounded-[8px] relative">
        <div className="absolute top-0 right-[-20%] w-full h-full ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={200} height={200}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={60}
                fill={activeIndex === 0 ? "#4AFF93" : "#26FFFF"}
                dataKey="value"
                onMouseEnter={(e, index) => {
                  setActiveIndex(index);
                }}
                className="text-white"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div
        className="w-[100px] h-fit rounded-lg bg-[#1C1D22] absolute top-[50%] left-6 transform translate-y-[-50%] px-5 py-5 text-[16px] flex flex-col gap-[20px] items-center"
        style={{
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
          }}
        >
          <Image
            src={
              activeIndex === 0
                ? "/images/Dashboard/AsideContainer/SOL.svg"
                : "/images/Dashboard/AsideContainer/USDC.svg"
            }
            width={20}
            height={20}
            alt="solana"
          />
        </div>
        <div className="text-[12px] text-center">
          <p className="text-white font-bold">
            {balance === balanceUSDC && balance === 0
              ? 0
              : `${
                  Math.trunc(data[activeIndex].value) >= 1000
                    ? Math.trunc(data[activeIndex].value / 1000).toString() +
                      "K"
                    : Math.trunc(data[activeIndex].value) >= 1000000
                    ? Math.trunc(data[activeIndex].value / 1000000).toString() +
                      "M"
                    : Math.trunc(data[activeIndex].value)
                }${
                  data[activeIndex].value < 100
                    ? data[activeIndex].value.toString().split(".")[1]
                      ? "."
                      : ""
                    : ""
                }${
                  data[activeIndex].value < 100
                    ? data[activeIndex].value > 0
                      ? data[activeIndex].value
                          .toString()
                          .split(".")[1]
                          .substring(0, 2)
                      : ""
                    : ""
                }`}
          </p>
          <p className="text-white font-bold">{data[activeIndex].name}</p>
        </div>
      </div>
    </div>
  );
}
