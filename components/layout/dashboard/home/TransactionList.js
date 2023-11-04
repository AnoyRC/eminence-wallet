import React, { useState, useEffect } from "react";
import Image from "next/image";

const tableHeadings = ["name", "date", "id", "amount", "private"];

const parseMoneyType = (moneyType) => {
  if (moneyType === "Sol") {
    return " Sol";
  } else if (moneyType === "USDC") {
    return " USDC";
  }
  return "";
};

const parseType = (type) => {
  return type === "credited" ? "+" : "-";
};

const TransactionList = ({ data }) => {
  console.log(data);
  return (
    <div className="grid grid-cols-5 pl-[20px] bg-primary-black w-full h-full rounded-b-lg">
      {data && data.length > 0 ? (
        data.map((rowData, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {tableHeadings.map((heading, headingIndex) => (
              <div
                key={`${rowIndex}-${headingIndex}`}
                className={`py-4 text-[14px] font-medium text-primary-white ${
                  headingIndex === 1 ? "break-words" : ""
                } ${
                  headingIndex === 3 || headingIndex === 4 ? "pl-[30px]" : ""
                }`}
              >
                {headingIndex === 1 ? (
                  <h1>
                    {rowData.date.split(" ").slice(0, 3).join(" ")}
                    <br />
                    <p className="text-[10px] font-medium text-[#f0f0f099]">
                      {rowData.date.split(" ").slice(3).join(" ")}
                    </p>
                  </h1>
                ) : headingIndex === 3 ? (
                  <h1
                    className={`text-[14px] font-medium  ${
                      rowData.type === "credited"
                        ? "text-primary"
                        : "text-[#DF0000]"
                    }`}
                  >
                    {`${parseType(rowData.type)}${
                      rowData.amount.split(".")[0]
                    }`}
                    <span className="text-[12px]">{`.${
                      rowData.amount.split(".")[1]
                    }`}</span>
                    <span className="text-primary-white">
                      {parseMoneyType(rowData.moneyType)}{" "}
                    </span>
                  </h1>
                ) : headingIndex === 4 ? (
                  <div className="flex items-center">
                    <div
                      className={`w-[16px] h-[16px] bg-gradient-to-r from-[#4AFF93] to-[#26FFFF] rounded-sm ${
                        rowData.private === "true"
                          ? "flex flex-row justify-center"
                          : "p-[1px]"
                      }`}
                    >
                      {rowData.private === "true" ? (
                        <Image
                          src="/images/checkbox-tick.svg"
                          width={12}
                          height={12}
                          alt="checkbox-tick"
                          className="prevent-select"
                        />
                      ) : (
                        <div className="bg-primary-black h-full rounded-sm"></div>
                      )}
                    </div>
                  </div>
                ) : (
                  rowData[heading]
                )}
              </div>
            ))}
          </React.Fragment>
        ))
      ) : (
        <div className="col-span-5 text-white py-4 text-center">
          No Transactions to Show
        </div>
      )}
    </div>
  );
};

export default TransactionList;
