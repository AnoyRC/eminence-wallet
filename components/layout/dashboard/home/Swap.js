'use client';
import Balance from '@/components/ui/Balance';
import GradientButton from '@/components/ui/GradientButton';
import useSwap from '@/hooks/useSwap';
import useToast from '@/hooks/useToast';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Swap = () => {
  const [amount, setAmount] = useState(1);
  const [symbol, setSymbol] = useState('SOL');
  const { Error } = useToast();
  const { swap, swapUSDC, quote, quoteUSDC } = useSwap();
  const balance = useSelector((state) => state.profile.balance);
  const balanceUSDC = useSelector((state) => state.profile.balanceUSDC);
  const quoteData = useSelector((state) => state.profile.quote);
  const quoteUSDCData = useSelector((state) => state.profile.quoteUSDC);
  const connection = useSelector((state) => state.profile.connection);

  const handleChange = (e) => {
    if (e.target.value === '') setAmount(0);
    const regex = new RegExp('^[0-9]*[.]{0,1}[0-9]{0,2}$');
    if (regex.test(e.target.value)) setAmount(e.target.value);
  };

  useEffect(() => {
    if (amount && symbol === 'SOL' && amount !== '0') {
      quote(amount);
    }
    if (amount && symbol === 'USDC' && amount !== '0') {
      quoteUSDC(amount);
    }
  }, [amount, symbol]);

  return (
    <div className="flex flex-col justify-between h-full px-[28px] relative">
      {connection === 'https://api.devnet.solana.com' && (
        <div className="w-full h-full backdrop-filter backdrop-blur-lg bg-black/30 absolute top-0 left-0 z-10 flex flex-col justify-center items-center">
          <Image src="/images/logo.png" alt="logo" width={50} height={50} />

          <h3 className="text-primary-white font-bold text-2xl leading-normal">
            Eminence
          </h3>

          <p className="text-primary-white max-w-xs text-center">
            Swapping is not available in devnet
          </p>
        </div>
      )}
      <div className="flex flex-col gap-[20px]">
        <div className="flex">
          <p className="text-white text-[16px] mr-1"> Swap by </p>
          <Image
            src="/images/Dashboard/AsideContainer/Jupiter.svg"
            width={20}
            height={20}
            alt="Jupiter"
          />
          <p className="text-white text-[16px] ml-1"> Jupiter </p>
        </div>

        <div className="flex flex-col gap-[20px] relative">
          <Balance
            symbol={symbol}
            type={'Send'}
            editable
            balance={symbol === 'SOL' ? balance : balanceUSDC}
            value={amount}
            onChange={handleChange}
          />
          <Balance
            symbol={symbol === 'SOL' ? 'USDC' : 'SOL'}
            type={'Receive'}
            amount={
              symbol === 'SOL'
                ? quoteData
                  ? quoteData.outAmount
                    ? quoteData.outAmount / 10 ** 6
                    : 0
                  : 0
                : quoteUSDCData
                ? quoteUSDCData.outAmount
                  ? quoteUSDCData.outAmount / LAMPORTS_PER_SOL
                  : 0
                : 0
            }
            balance={symbol === 'SOL' ? balanceUSDC : balance}
          />
          <div
            className="flex items-center justify-center h-[60px] w-[60px] rounded-full bg-[#1C1D22] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] hover:cursor-pointer"
            style={{
              boxShadow: '0px 0px 12px 8px rgba(0, 0, 0, 0.25)',
            }}
            onClick={() => {
              setSymbol(symbol === 'SOL' ? 'USDC' : 'SOL');
            }}
          >
            <Image
              src="/images/Dashboard/AsideContainer/Swap.svg"
              width={32}
              height={32}
              alt="Swap"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-[10px] mt-10">
        <GradientButton
          label={'Swap'}
          style={'mb-5'}
          onClick={
            symbol === 'SOL'
              ? () => swap(amount, quoteData.outAmount / 10 ** 6)
              : () =>
                  swapUSDC(amount, quoteUSDCData.outAmount / LAMPORTS_PER_SOL)
          }
        />
      </div>
    </div>
  );
};

export default Swap;
