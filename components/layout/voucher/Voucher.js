'use client';
import { useState, useEffect } from 'react';
import { DocumentDuplicateIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Avatar, { genConfig } from 'react-nice-avatar';

import useToast from '@/hooks/useToast';

import QRCodeGenerator from '../profile/CardQrCode';
import { useSelector } from 'react-redux';
import useGetServer from '@/hooks/useGetServer';

export default function Voucher({ amount, message, pubKey, id }) {
  const { Info } = useToast();
  const { getUserByPubkey } = useGetServer();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserByPubkey(pubKey);

      setUser(data);
    };

    if (pubKey) fetchUser();
  }, [pubKey]);

  return (
    <div
      className="w-full items-center rounded-lg p-0.5"
      style={{
        background: 'linear-gradient(90deg, #4AFF93 0%, #26FFFF 100%)',
      }}
    >
      <div className="relative flex justify-between w-full bg-black rounded-lg prevent-select px-3">
        <div className="flex w-fit">
          <Image
            src="/images/logo.png"
            width={144}
            height={144}
            alt="Logo"
            className="h-36"
          />

          <Image
            src="/images/myVouchers/ribbon.svg"
            width={100}
            height={100}
            alt=""
            className="-ml-3 h-full"
          />
        </div>

        <div className="flex flex-col py-5 mx-8">
          <h3 className="text-[86px] text-white font-bold mb-5">Voucher</h3>

          {message ? (
            <p className="text-2xl break-wordd text-white max-w-sm mb-12">
              {message}
            </p>
          ) : (
            <div className="mb-12">
              <p className="bg-primary-black h-6 w-96 skeleton mb-2 rounded-full"></p>
              <p className="bg-primary-black h-6 w-96 skeleton mb-2 rounded-full"></p>
              <p className="bg-primary-black h-6 w-96 skeleton mb-2 rounded-full"></p>
            </div>
          )}

          <div className="flex w-full gap-3">
            <p className="text-[28px] font-bold text-white ">Amount:</p>
            <div
              className="flex justify-center items-center py-[6px] px-6 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #4AFF93 0%, #26FFFF 100%)',
              }}
            >
              {amount && (
                <p className="text-lg text-black font-bold">{amount} Sol</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center py-5 mt-5">
          {id ? (
            <QRCodeGenerator
              remainingRoute={`${process.env.NEXT_PUBLIC_BASE_URL}/vouchers/${id}}`}
              height={200}
              width={200}
            />
          ) : (
            <div className="w-48 h-48 bg-primary-black skeleton rounded-lg"></div>
          )}

          <div className="flex gap-3 px-5">
            {user ? (
              <>
                <div className="h-[70px] w-[70px] rounded-full border-[2px] flex items-center justify-center border-[#26FFFF]">
                  <Avatar
                    style={{ width: '64px', height: '64px' }}
                    {...genConfig('smkmskmd')}
                    className=""
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h4
                    className=" font-bold text-transparent text-[24px] bg-clip-text bg-gradient-to-r from-[#4AFF93] to-[#26FFFF] max-w-[192px] whitespace-nowrap overflow-hidden"
                    style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                  >
                    {user?.firstName + ' ' + user?.lastName}
                  </h4>

                  <button
                    className="text-[#f0f0f099] flex flex-start items-center text-[16px] hover:cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(pubKey);
                      Info('Copied to clipboard');
                    }}
                  >
                    {user &&
                      user.pubkey &&
                      user.pubkey.substring(0, 4) +
                        '...' +
                        user.pubkey.substring(
                          user.pubkey.length - 4,
                          user.pubkey.length
                        )}

                    <DocumentDuplicateIcon className="w-[11px] h-[11px] ml-[4px]" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="h-[70px] w-[70px] rounded-full border-[2px] flex items-center justify-center border-[#26FFFF]">
                  <div className="w-16 h-16 rounded-full bg-primary-black skeleton"></div>
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="h-5 w-32 bg-primary-black skeleton mb-1 rounded-full"></h3>

                  <p className="bg-primary-black h-4 w-10 skeleton rounded-full"></p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
