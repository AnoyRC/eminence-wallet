'use client';
import React, { useState, useEffect } from 'react';
import TransactionList from './TransactionList';
import { ArrowsUpDownIcon } from '@heroicons/react/24/solid';

const sampleData = [
  {
    name: 'Gautam',
    date: 'Aug 21, 2023 09:30 PM',
    id: '2EHbc...KjLKn',
    amount: '0.313',
    type: 'credited',
    moneyType: 'Sol',
    private: 'true',
  },
  {
    name: 'Sourabh',
    date: 'Aug 24, 2023 09:30 PM',
    id: '2EHbc...KjLKn',
    amount: '0.312',
    type: 'debited',
    moneyType: 'USDC',
    private: 'true',
  },
  {
    name: 'Anoy',
    date: 'Aug 22, 2023 09:30 PM',
    id: '2EHbc...KjLKn',
    amount: '0.315',
    type: 'credited',
    moneyType: 'Sol',
    private: 'false',
  },
  {
    name: 'Pratik',
    date: 'Aug 22, 2023 09:30 PM',
    id: '2EHbc...KjLKn',
    amount: '0.315',
    type: 'credited',
    moneyType: 'Sol',
    private: 'false',
  },
  {
    name: 'Oishee',
    date: 'Aug 22, 2023 09:30 PM',
    id: '2EHbc...KjLKn',
    amount: '0.315',
    type: 'credited',
    moneyType: 'Sol',
    private: 'false',
  },
  {
    name: 'Gautam',
    date: 'Aug 25, 2023 09:30 PM',
    id: '2EHbc...KjLKn',
    amount: '0.315',
    type: 'credited',
    moneyType: 'Sol',
    private: 'false',
  },
];
const tableHeadings = ['name', 'date', 'id', 'amount', 'private'];

const sortData = (data, columnIndex, isAscending) => {
  return data.slice().sort((a, b) => {
    if (columnIndex === 1) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return isAscending ? dateA - dateB : dateB - dateA;
    } else if (columnIndex === 3) {
      const amountA = parseFloat(a.amount);
      const amountB = parseFloat(b.amount);
      return isAscending ? amountA - amountB : amountB - amountA;
    }
    return 0;
  });
};
const Transactions = ({ numItemsToShow }) => {
  const [data, setData] = useState([]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    let sortedData = [...sampleData].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    if (numItemsToShow) {
      sortedData = sortedData.slice(0, numItemsToShow);
    }

    setData(sortedData);
  }, [numItemsToShow]);

  const handleSort = (columnIndex) => {
    if (columnIndex === 0 || columnIndex === 4 || columnIndex === 2) {
      return;
    }

    const newIsAscending = columnIndex === sortedColumn ? !isAscending : true;
    const sortedData = sortData(data, columnIndex, newIsAscending);

    setData(sortedData);
    setSortedColumn(columnIndex);
    setIsAscending(newIsAscending);
  };

  return (
    <div className="container mx-auto  w-[636px] bg-primary-black ">
      <h1 className="text-2xl text-primary-white font-bold mb-4">
        Cash Out Transactions
      </h1>
      <div className="w-full bg-gradient-to-r from-[#4AFF93] to-[#26FFFF] rounded-lg p-1 ">
        <div className="grid grid-cols-5 pl-[20px] bg-primary-black w-full h-full rounded-t-lg">
          {tableHeadings.map((heading, index) => (
            <div
              key={heading}
              onClick={() => handleSort(index)}
              className={`py-4 text-[#f0f0f099] font-medium cursor-pointer ${
                (index === 0 || index === 4 || index === 2) &&
                'pointer-events-none'
              } ${
                index === 3 || index === 4 ? 'pl-[30px]' : ''
              } border-b border-[#f0f0f099]`}
            >
              <div className="flex items-center ">
                <span>
                  {index === 2
                    ? `Transaction ${
                        heading.charAt(0).toUpperCase() + heading.slice(1)
                      }`
                    : heading.charAt(0).toUpperCase() + heading.slice(1)}
                </span>
                {index === 1 || index === 3 ? (
                  <span className="ml-2">
                    <ArrowsUpDownIcon className="text-[#f0f0f099] h-[12px] w-[12px]" />
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <TransactionList data={data} />
      </div>
    </div>
  );
};

export default Transactions;
