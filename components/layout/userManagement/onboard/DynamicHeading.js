'use client';

import { useSelector } from 'react-redux';

import Heading from '../Heading';

const DynamicHeading = () => {
  const currentStep = useSelector((state) => state.default.currentStep);

  const headers = [
    'Embark on Your Crypto Journey',
    'Unleash Fort Knox',
    'Guardian of Your Future',
    'Forge a Key to Unlock your Digital Vault',
    'Decode Your Queries',
  ];

  return <Heading text={headers[currentStep - 1]} />;
};

export default DynamicHeading;
