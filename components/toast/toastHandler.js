"use client";
import { useSelector } from "react-redux";
import Toast from "./toast";
import { useEffect } from "react";

export default function ToastHandler() {
  const toastlist = useSelector((state) => state.toast.toastList);

  return (
    <div className="absolute bottom-7 left-7 flex flex-col space-y-5 z-[100]">
      {toastlist.length > 0 &&
        toastlist.map((toast, index) => (
          <Toast key={index} type={toast.type} msg={toast.msg} />
        ))}
    </div>
  );
}
