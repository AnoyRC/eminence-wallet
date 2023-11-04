'use client';

import React, { useEffect, useState } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const avatarData = [
  '86iGNxV0guNu5V',
  'Wj4hBkkfAuZCdM',
  'RQUFGbSVwmcWqZ',
  'JK0acZQqyFfdMl',
  'KTSFUxMWW4ItYw',
  'b1segtMPrnYUSW',
  'HWcKYuJYdhh4if',
  'WsVDTMSf670h9D',
  'KfvLro8AYpMlj2',
  'HFFTRpgbyza08s',
  'Kn7kWZvUY4xAlk',
  'yMHhFpbJIHWXPm',
  '80jAFsvDsgGFyN',
  'YVPTjvHHEM3Htf',
  'nxCITXeFfO5pux',
  '0nEFjzBFActCk0',
  'KwsZZjmrY2MyBG',
  'ZeALu9oufMCnGq',
  'LOhQeebuhVYeqL',
  'acEX4O7zwjcbBJ',
  'xDhHsLjA8GwLM7',
  'oxwb2Mj7QBYYUm',
  '5hDPdx606M1kN7',
  'ch5GNrqtJ49XQY',
  'UyZbkNduUnQ7c5',
  'ZbBbjRNm0CZaX4',
  'dareUGhysB86ZG',
  'yS96NCpzSaerwO',
  'fVpZ268DvR5z7q',
  '2OgFjkSiFsY7Kq',
  'bbSiTspBC9Yg4T',
  'wBBOdBLXChZQ6U',
  'aDg47e4MQhhsjS',
  'aiNE4Z2v6QSbTu',
  '7RCHtZsGJ6nSwZ',
];

function AvatarList({ onAvatarClick }) {
  const [avatars, setAvatars] = useState(avatarData);
  const [visibleAvatars, setVisibleAvatars] = useState(avatars.slice(0, 7));

  const handlePrevClick = () => {
    const startIndex = avatars.indexOf(visibleAvatars[0]) - 1;
    if (startIndex >= 0) {
      setVisibleAvatars(avatars.slice(startIndex, startIndex + 7));
    }
  };

  const handleNextClick = () => {
    const startIndex = avatars.indexOf(visibleAvatars[0]) + 1;
    if (startIndex + 7 <= avatars.length) {
      setVisibleAvatars(avatars.slice(startIndex, startIndex + 7));
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <button
        type="button"
        className="cursor-pointer text-2xl mr-4"
        onClick={handlePrevClick}
      >
        <ChevronLeftIcon className="text-black h-6 w-6" />
      </button>

      <div className="flex overflow-x-auto py-3">
        {visibleAvatars.map((avatar) => (
          <div
            key={avatar}
            className="mr-3 cursor-pointer"
            onClick={() => {
              onAvatarClick(avatar);
            }}
          >
            <Avatar
              style={{ width: '2.25rem', height: '2.25rem' }}
              {...genConfig(avatar)}
              className=" transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="cursor-pointer text-2xl "
        onClick={handleNextClick}
      >
        <ChevronRightIcon className="text-black h-6 w-6" />
      </button>
    </div>
  );
}

export default AvatarList;
