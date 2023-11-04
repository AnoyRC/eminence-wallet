'use client';
import { Card, CardHeader, Typography } from '@material-tailwind/react';
import localFont from 'next/font/local';
import Avatar, { genConfig } from 'react-nice-avatar';

const myFont = localFont({
  src: '../../../../public/fonts/Satoshi-Variable.woff2',
});

const contacts = [
  { avatarId: 'Sourabh', firstName: 'Sourabh', status: 'online' },
  { avatarId: 'Guatam', firstName: 'Gautam', status: 'online' },
  { avatarId: 'Anoy', firstName: 'Anoy', status: 'online' },
  { avatarId: 'Pratik', firstName: 'Pratik', status: 'offline' },
];

export default function ContactV2() {
  return (
    <div className="w-[310px] h-[230px] bg-[#1c1d22] rounded-[8px] p-[0.5px]">
      <div className="w-full h-full bg-transparent rounded-[8px]">
        <Card className={'h-full w-full bg-[#1c1d22]'}>
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-[#1c1d22] mt-0 mx-0 mb-4"
          >
            <div className=" flex flex-col justify-between">
              <div>
                <Typography
                  variant="h5"
                  color="white"
                  className={myFont.className}
                >
                  Recent Contacts
                </Typography>
              </div>
            </div>
          </CardHeader>
          <div className="grid grid-cols-2 w-full h-full gap-4">
            {contacts.map((contact) => (
              <div
                key={contact.avatarId}
                className="p-[0.5px] rounded-[8px]"
                style={{
                  background:
                    'linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)',
                }}
              >
                <div className=" flex flex-col w-full h-full items-center justify-center gap-[8px] bg-black rounded-[8px] transition-all hover:scale-110">
                  <div className="relative">
                    <Avatar
                      style={{ width: '2.5rem', height: '2.5rem' }}
                      {...genConfig(contact.avatarId)}
                      className=""
                    />
                    <div
                      className={`absolute bottom-0 right-0 w-[6.5px] h-[6.5px] rounded-full ${
                        contact.status === 'online'
                          ? 'bg-primary'
                          : 'bg-red-500'
                      } `}
                    ></div>
                  </div>
                  <h1 className="text-center text-primary-white text-[14px] font-bold ">
                    {contact.firstName}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
