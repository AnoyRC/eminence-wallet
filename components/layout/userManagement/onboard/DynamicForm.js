"use client";

import { useSelector } from "react-redux";

import GetStarted from "./steps/GetStarted";
import SecurityPhase from "./steps/SecurityPhase";
import ConfirmSecurity from "./steps/ConfirmSecurity";
import Password from "./steps/SetPassword";
import Faq from "./steps/Faq";

const DynamicForm = () => {
  const currentStep = useSelector((state) => state.default.currentStep);

  return (
    <>
      {currentStep === 1 && <GetStarted />}
      {currentStep === 2 && <SecurityPhase />}
      {currentStep === 3 && <Password />}
      {currentStep === 4 && <Faq />}
    </>
  );
};
export default DynamicForm;
