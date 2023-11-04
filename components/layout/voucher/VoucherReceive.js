'use client';

import { useEffect, useState } from 'react';
import { Input } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import Button from '@/components/ui/Button';
import useVoucher from '@/hooks/useVoucher';
import useLogin from '@/hooks/useLogin';
import useGetServer from '@/hooks/useGetServer';
import { useRouter } from 'next/navigation';

export default function VoucherReceive({ id, amount }) {
  const [password, setPassword] = useState('');
  const { redeemVoucherWeb3 } = useVoucher();

  const router = useRouter();
  const { checkLogin } = useLogin();
  const mnemonics = useSelector((state) => state.wallet.mnemonics);

  const { getUserSelf } = useGetServer();

  const handleRedeemVoucher = async (e) => {
    e.preventDefault();

    if (!checkLogin()) return;

    try {
      const voucher = await redeemVoucherWeb3(id, password, amount);
      if (voucher) router.push('/dashboard');

      return;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (mnemonics) {
      getUserSelf();
    }
  }, [mnemonics]);

  return (
    <div className="w-full items-center rounded-lg p-0.5 bg-gradient-priamry max-w-sm mx-auto">
      <div className="flex justify-between h-full w-full bg-black rounded-lg px-2 py-4 gap-3 items-center">
        <form className="flex-grow px-5 flex flex-col gap-4">
          <Input
            variant="standard"
            label="Enter Password"
            color="white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type={'submit'}
            label="Claim"
            fullWidth
            color="bg-gradient-priamry"
            style="font-bold py-2 rounded-lg mt-5"
            onClick={handleRedeemVoucher}
          />
        </form>
      </div>
    </div>
  );
}
