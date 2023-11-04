"use client";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import { removeToast } from "@/redux/toastSlice";

export default function Toast({ type, msg }) {
  const dispatch = useDispatch();
  const toast = useRef(null);
  useEffect(() => {
    gsap.set(toast.current, {
      opacity: 0,
      x: -100,
    });
    gsap.to(toast.current, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: "power4.out",
    });
    setTimeout(() => {
      gsap.fromTo(
        toast.current,
        {
          opacity: 1,
          x: 0,
        },
        {
          opacity: 0,
          x: -100,
          duration: 0.5,
          ease: "power4.out",
        }
      );
      setTimeout(() => {
        dispatch(removeToast());
      }, 1000);
    }, 3000);
  }, []);
  return (
    <div
      className="flex items-center justify-start w-full h-16 text-white rounded-xl py-7 pr-7 pl-4 font-bold"
      style={{
        background:
          type === "error"
            ? "#f75f3e"
            : type === "success"
            ? "#6bde3f"
            : "#3eb4f7",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      ref={toast}
    >
      {type === "error" && <XCircleIcon className="w-[40px]" />}
      {type === "success" && <CheckCircleIcon className="w-[40px]" />}
      {type === "info" && <ExclamationCircleIcon className="w-[40px]" />}{" "}
      <span className="ml-3">{msg}</span>
    </div>
  );
}
