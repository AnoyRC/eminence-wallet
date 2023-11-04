"use client";

import { useSelector } from "react-redux";

import StepsItem from "./StepsItem";

const steps = [
  {
    id: 1,
    name: "Craft Your Digital Vault",
    img: "/images/userManagement/steps/profile.svg",
  },
  {
    id: 2,
    name: "Reveal Your Wallet's Core",
    img: "/images/userManagement/steps/shield.svg",
  },
  // {
  //   id: 3,
  //   name: 'Verify Your Secret Shield',
  //   img: '/images/userManagement/steps/verify-shield.svg',
  // },
  {
    id: 3,
    name: "Set and Confirm Your PassCode",
    img: "/images/userManagement/steps/lock.svg",
  },
  {
    id: 4,
    name: "Your Security and Privacy",
    img: "/images/userManagement/steps/faq.svg",
  },
];

const Steps = () => {
  const currentStep = useSelector((state) => state.default.currentStep);

  return (
    <section className="flex justify-center items-center gap-6">
      {steps.map((step) => (
        <StepsItem
          key={step.id}
          id={step.id}
          name={step.name}
          img={step.img}
          currentStep={currentStep}
        />
      ))}
    </section>
  );
};

export default Steps;
