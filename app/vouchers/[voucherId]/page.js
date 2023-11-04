'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Switch } from '@material-tailwind/react';

import useGetServer from '@/hooks/useGetServer';

import { setDevnet, setMainnet } from '@/redux/profileSlice';

import LoadingAnimation from '@/components/LoadingAnimation';
import Voucher from '@/components/layout/voucher/Voucher';
import VoucherReceive from '@/components/layout/voucher/VoucherReceive';
import Button from '@/components/ui/Button';

export default function VoucherId({ params }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [voucher, setVoucher] = useState({});

  const dispatch = useDispatch();

  const connection = useSelector((state) => state.profile.connection);

  const { getVoucherById } = useGetServer();

  useEffect(() => {
    const fetchVoucher = async () => {
      const data = await getVoucherById(params.voucherId);

      setVoucher(data);
      setLoading(false);
    };

    fetchVoucher();
  }, []);

  const handleClick = () => {
    router.push('/dashboard');
  };

  return (
    <section className="w-screen h-screen bg-primary-black relative">
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className=" flex flex-col max-w-5xl gap-10 mx-auto h-full justify-center">
          <Button
            label="Go to Dashboard"
            rounded
            color="bg-gradient-priamry"
            style="font-bold py-2 rounded-lg absolute top-5 left-5 px-5"
            onClick={handleClick}
          />

          <div className="flex ml-auto">
            <div className="flex gap-2">
              {!(connection === 'https://api.devnet.solana.com') ? (
                <p className="text-[16px] text-white font-bold">Devnet</p>
              ) : (
                <p className="text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-[#4AFF93] to-[#26FFFF] font-bold">
                  Devnet
                </p>
              )}
              <Switch
                id="custom-switch-component"
                ripple={false}
                checked={!(connection === 'https://api.devnet.solana.com')}
                onChange={() => {
                  if (connection === 'https://api.devnet.solana.com') {
                    dispatch(setMainnet());
                  } else {
                    dispatch(setDevnet());
                  }
                }}
                className="h-full w-full checked:bg-gradient-to-r checked:from-[#4AFF93] checked:to-[#26FFFF]"
                containerProps={{
                  className: 'w-11 h-6',
                }}
                circleProps={{
                  className: 'before:hidden left-0.5 border-none',
                }}
              />
              {connection === 'https://api.devnet.solana.com' ? (
                <p className="text-[16px] text-white font-bold">Mainnet</p>
              ) : (
                <p className="text-[16px] text-transparent bg-clip-text bg-gradient-to-r from-[#4AFF93] to-[#26FFFF] font-bold">
                  Mainnet
                </p>
              )}
            </div>
          </div>

          <Voucher
            id={voucher.voucherId}
            amount={voucher.amount}
            message={voucher.message}
            pubKey={voucher.pubkey}
          />

          <VoucherReceive id={voucher.voucherId} amount={voucher.amount} />
        </div>
      )}
    </section>
  );
}
