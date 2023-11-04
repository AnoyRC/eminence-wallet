"use client";

import Image from "next/image";
import {
  ArrowPathRoundedSquareIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import useToast from "@/hooks/useToast";

export default function CardBack({ toggleCard, user, design }) {
  const { Info } = useToast();

  const backgroundColor =
    design === "white" ? "bg-primary-white" : "bg-primary-black";
  const textColor =
    design === "white" ? "text-primary-black" : "text-primary-white";
  const accountNoColor =
    design === "white" ? "text-[#1c1d22cc]" : "text-[#CCC]";
  return (
    <div
      className={`${backgroundColor} relative overflow-hidden  w-[220px] h-[316px] shadow-md shadow-[#ffffff40] rounded-lg`}
    >
      <div className="absolute w-[348px] h-[385px] left-6">
        <Image
          src="/images/Frame_32.png"
          width={412}
          height={400}
          className="w-full h-full"
        />
      </div>

      <div className=" w-full h-full flex flex-col justify-between items-end px-3 py-3">
        <button
          onClick={() => toggleCard()}
          className="hover:cursor-pointer z-20"
        >
          <ArrowPathRoundedSquareIcon
            className={`${textColor} h-[20px] w-[20px] `}
          />
        </button>

        <div className="relative flex gap-[12px] items-center z-10 w-full px-2">
          {user ? (
            <>
              <ProfileAvatar
                style={{ width: "2rem", height: "2rem" }}
                id={user?.avatarId}
              />

              <div className="  flex flex-col justify-center justify-items-start">
                <h3 className={`${textColor} text-[14px] font-medium`}>
                  {user.firstName + " " + user.lastName}
                </h3>
                <button
                  className={`flex flex-start items-center text-[12px] hover:cursor-pointer ${accountNoColor}`}
                  onClick={() => {
                    console.log("Hi");
                    navigator.clipboard.writeText(
                      user ? user.pubkey : "00000000"
                    );
                    Info("Copied to clipboard");
                  }}
                >
                  {user
                    ? user.pubkey.substring(0, 4) +
                      "..." +
                      user.pubkey.substring(
                        user.pubkey.length - 4,
                        user.pubkey.length
                      )
                    : "00000000"}
                  <DocumentDuplicateIcon className="w-[13px] h-[13px] ml-[4px]" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-black/40 skeleton"></div>

              <div className="flex flex-col justify-center">
                <h3 className="h-5 w-32 bg-black/40 skeleton mb-1"></h3>

                <p className="bg-black/40 h-4 w-10 skeleton"></p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
