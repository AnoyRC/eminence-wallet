'use client';

import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Checkbox,
} from '@material-tailwind/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

import Avatar, { genConfig } from 'react-nice-avatar';
import { useEffect, useState } from 'react';
import TransactionHead from './TransactionHead';
import TransactionBody from './TransactionBody';
import TransactionFooter from './TransactionFooter';

const TABLE_HEAD = ['Name', 'Amount', 'Date', 'Type', 'Private'];

const TABLE_ROWS = [
  {
    avatarId: 'anoy',
    name: 'Anoy',
    pubKey: 'FdK7Kuaa6Qao1PQH9mMPYgvEKeC2jAViM67skuAcV1iM',
    amount: '- 25 Sol',
    date: 1696331258566,
    type: 'send',
    isPrivate: true,
  },
  {
    avatarId: 'gautam',
    name: 'Gautam',
    pubKey: 'FdK7Kuaa6Qao1PQH9mMPYgvEKeC2jAViM67skuAcV1iM',
    amount: '+ 25 Sol',
    date: 1696331258566,
    type: 'receive',
    isPrivate: false,
  },
  {
    avatarId: 'Sikari',
    name: 'Sikari',
    pubKey: 'FdK7Kuaa6Qao1PQH9mMPYgvEKeC2jAViM67skuAcV1iM',
    amount: '- 25 Sol',
    date: 1696331258566,
    type: 'swap',
    isPrivate: false,
  },
  {
    avatarId: 'Pratik',
    name: 'Pratik',
    pubKey: 'FdK7Kuaa6Qao1PQH9mMPYgvEKeC2jAViM67skuAcV1iM',
    amount: '- 25 Sol',
    date: 1696331258566,
    type: 'voucher',
    isPrivate: false,
  },
];

export default function TransactionV2() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className="h-full w-full rounded-[8px] p-[0.5px]"
      style={{
        background: 'linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)',
      }}
    >
      <Card className={'h-full w-full rounded-[8px] bg-black'}>
        <TransactionHead />
        <TransactionBody TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={TABLE_ROWS} />
        <TransactionFooter />
      </Card>
    </div>
  );
}
