'use client';

import { ArrowPathIcon } from '@heroicons/react/24/solid';

import { generateRandomString } from './generateRandomString';

const GenerateNewAvatar = ({ setRandomString }) => {
  const generateNewAvatar = () => {
    const newString = generateRandomString(10);
    setRandomString(newString);
  };

  return (
    <button
      className="absolute bottom-6 right-2 p-2 rounded-full bg-[#CDFFF9] border-primary-black border flex justify-center items-center cursor-pointer hover:scale-105 active:scale-95"
      type="button"
      onClick={generateNewAvatar}
    >
      <ArrowPathIcon className="text-primary-black h-5 w-5" />
    </button>
  );
};

export default GenerateNewAvatar;
