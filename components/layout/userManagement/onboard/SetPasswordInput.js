"use client";
import { useRef } from "react";
import { ConfirmPasswordBtn } from "./FormBtn";

const SetPasswordInput = () => {
  const password = useRef();
  const confirmPassword = useRef();

  return (
    <>
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

      <ConfirmPasswordBtn
        password={password}
        confirmPassword={confirmPassword}
      />
    </>
  );
};

export default SetPasswordInput;
