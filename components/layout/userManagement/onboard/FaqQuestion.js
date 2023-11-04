"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const FaqQuestion = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <section className="mb-8">
      <Accordion
        className="flex flex-col items-center border-b-blue-red-700"
        open={open === 1}
        icon={<Icon id={1} open={open} />}
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="text-primary-black text-base border-b border-b-primary-black/60"
        >
          What if I loose my security phrase / password?
        </AccordionHeader>

        <AccordionBody className="text-primary-black/80 px-2">
          Worry not, if you lose your security phrase, you can use your security
          image to recover your wallet. if you lose both, sadly we can&apos;t
          help you recover your wallet.
        </AccordionBody>
      </Accordion>

      <Accordion
        className="flex flex-col items-center"
        open={open === 2}
        icon={<Icon id={2} open={open} />}
      >
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="text-primary-black text-base border-b border-b-primary-black/60"
        >
          If an agent asks you about your security phrase?
        </AccordionHeader>

        <AccordionBody className="text-primary-black/80 px-2">
          We will never ask you about your security phrase or password. If
          someone asks you about it, they are trying to scam you.
        </AccordionBody>
      </Accordion>
    </section>
  );
};

export default FaqQuestion;
