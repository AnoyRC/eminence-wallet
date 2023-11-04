'use client';

import useOnboard from '@/hooks/useOnboard';

import Button from '@/components/ui/Button';
import useToast from '@/hooks/useToast';
import usePostServer from '@/hooks/usePostServer';
import useCreateWallet from '@/hooks/useCreateWallet';
import { useDispatch } from 'react-redux';
import { next } from '@/redux/defaultSlice';

const GetStartedBtn = () => {
  const { step1 } = useOnboard();

  return (
    <div className="space-y-4 w-full max-w-xs">
      <Button
        label="Create New Wallet"
        fullWidth
        color="bg-primary-black text-primary-white"
        style="font-bold text-base rounded-lg py-3 "
        onClick={step1.CreateWallet}
      />

      <Button
        label="Import your Wallet"
        fullWidth
        color="bg-primary-black text-primary-white"
        style="font-bold text-base rounded-lg py-3"
        onClick={step1.importWallet}
      />
    </div>
  );
};

const SecurityPhaseBtn = () => {
  const { step2 } = useOnboard();
  const dispatch = useDispatch();

  return (
    <div className="space-y-2 w-full max-w-xs">
      <Button
        label="Continue"
        fullWidth
        color="bg-primary-black text-primary-white"
        style="font-bold text-base rounded-lg py-3"
        onClick={step2.Continue}
      />

      <p className="text-primary-black text-sm font-medium text-center">
        Don&apos;t want to upload image?{' '}
        <button
          className="underline underline-offset-4 font-bold transition-transform hover:scale-105"
          onClick={async (e) => {
            e.preventDefault();
            dispatch(next());
          }}
        >
          Generate random
        </button>
      </p>
    </div>
  );
};

const ConfirmSecurityBtn = ({ inputMnemonic }) => {
  const { step3 } = useOnboard();
  const { Error } = useToast();

  const handleClick = (e) => {
    e.preventDefault();

    for (let i = 0; i < inputMnemonic.length; i++) {
      if (inputMnemonic[i] === '') {
        Error('Please fill all the fields');
        return;
      }
    }

    step3.ConfirmPhrase(inputMnemonic.join(' '));
  };

  return (
    <div className="w-full max-w-xs">
      <Button
        label="Confirm Security Phrase"
        fullWidth
        color="bg-primary-black text-primary-white"
        style="font-bold text-base rounded-lg py-3 mb-1.5"
        onClick={handleClick}
      />

      <p className="text-primary-black text-sm font-medium text-center">
        Forgot Security Phase?{' '}
        <button
          className="underline underline-offset-4 font-bold transition-transform hover:scale-105"
          type="button"
          onClick={step3.Regenerate}
        >
          Generate New
        </button>
      </p>
    </div>
  );
};

const ConfirmPasswordBtn = ({ password, confirmPassword }) => {
  const { step4 } = useOnboard();
  const { Error } = useToast();
  const { generateToken } = usePostServer();
  const { signMessage } = useCreateWallet();

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      password.current.value.length === 0 ||
      confirmPassword.current.value.length === 0
    ) {
      Error('Please fill all the fields');
      return;
    }

    if (password.current.value === confirmPassword.current.value) {
      try {
        const signature = await signMessage();

        await generateToken(signature);

        step4.ConfirmPassword(password.current.value);

        return;
      } catch (err) {
        Error('Something went wrong');
      }
    }
    Error('Password do not match');
  };

  return (
    <Button
      label="Confirm Password"
      fullWidth
      color="bg-primary-black text-primary-white"
      style="font-bold text-base rounded-lg py-3 mb-1.5"
      onClick={handleClick}
    />
  );
};

const FaqBtn = () => {
  const { step5 } = useOnboard();

  return (
    <Button
      label="Continue"
      fullWidth
      color="bg-primary-black text-primary-white"
      style="font-bold text-base rounded-lg py-3 mb-1.5"
      onClick={step5.Continue}
    />
  );
};

export {
  GetStartedBtn,
  SecurityPhaseBtn,
  ConfirmSecurityBtn,
  ConfirmPasswordBtn,
  FaqBtn,
};
