'use client';

import { useRef, useState } from 'react';
import { EminentBtn } from './FormBtn';
import Input from '@/components/ui/Input';
import { NewPasswordBtn } from './FormBtn';

const EminentInput = ({ avatar }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div className="max-w-xs space-y-3 mb-8">
      <Input
        placeholder="First Name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Input
        placeholder="Second Name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <EminentBtn firstName={firstName} lastName={lastName} avatarId={avatar} />
    </div>
  );
};

const WelcomeInput = ({ password, setPassword }) => {
  return (
    <div className="max-w-xs w-80 space-y-3 mb-8">
      <Input
        placeholder="Enter Password"
        type="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};

const NewPasswordInput = () => {
  const password = useRef();
  const confirmPassword = useRef();

  return (
    <div className="max-w-xs w-80">
      <input
        type="password"
        ref={password}
        className="w-full mb-5 rounded px-8 py-3 bg-primary-white/60 text-primary-black font-medium text-base"
        placeholder="Enter Password"
      />
      <input
        type="password"
        ref={confirmPassword}
        className="w-full rounded mb-5 px-8 py-3 bg-primary-white/60 text-primary-black font-medium text-base"
        placeholder="Confirm Password"
      />

      <NewPasswordBtn password={password} confirmPassword={confirmPassword} />
    </div>
  );
};

export { EminentInput, WelcomeInput, NewPasswordInput };
