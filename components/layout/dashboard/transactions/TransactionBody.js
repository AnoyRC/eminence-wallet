'use client';

import { useEffect, useState } from 'react';

import { Typography, CardBody, Chip, Checkbox } from '@material-tailwind/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

import Avatar, { genConfig } from 'react-nice-avatar';

const TransactionBody = ({ TABLE_HEAD, TABLE_ROWS }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <CardBody className="p-2 px-0">
      <table className="w-full table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head, index) => (
              <th
                key={head}
                className="border-y border-white bg-[#1C1D22] p-4 hover:bg-[#1C1D22]/50 cursor-pointer"
              >
                <Typography
                  variant="small"
                  color="white"
                  className={
                    'flex items-center justify-between font-normal leading-none opacity-70 '
                  }
                >
                  {head}
                  {index !== TABLE_HEAD.length - 1 && (
                    <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                  )}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(
            ({ avatarId, name, amount, date, type, isPrivate }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? 'p-4'
                : 'p-4 border-b border-blue-gray-50';

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        style={{ width: '2rem', height: '2rem' }}
                        {...genConfig(avatarId)}
                        className=""
                      />
                      <Typography
                        variant="small"
                        color="white"
                        className={'font-bold '}
                      >
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="white"
                      className={'font-normal '}
                    >
                      {amount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    {isClient && (
                      <Typography
                        variant="small"
                        color="white"
                        className={'font-normal  '}
                      >
                        {new Date(date).getDate() +
                          ' ' +
                          new Date(date).toLocaleString('default', {
                            month: 'long',
                          }) +
                          ' ' +
                          new Date(date).getFullYear()}
                      </Typography>
                    )}
                    {isClient && (
                      <Typography
                        variant="small"
                        color="white"
                        className={'font-normal  '}
                      >
                        {new Date(date).toLocaleTimeString()}
                      </Typography>
                    )}
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="filled"
                        value={type}
                        color={
                          type === 'receive'
                            ? 'green'
                            : type === 'send'
                            ? 'red'
                            : type === 'swap'
                            ? 'blue'
                            : 'orange'
                        }
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3 [&>*]:opacity-100">
                      <Checkbox
                        className="opacity-100"
                        defaultChecked={isPrivate}
                        containerProps={{
                          className:
                            'checked:[&>*]:border-none checked:[&>*]:bg-gradient-to-r checked:[&>*]:from-[#26FFFF] checked:[&>*]:to-[#4AFF93] [&>*]:text-black [&>*]:rounded-md',
                        }}
                        labelProps={{
                          className: 'opacity-100',
                        }}
                        disabled
                      />
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </CardBody>
  );
};
export default TransactionBody;
