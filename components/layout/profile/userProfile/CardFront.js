"use client";

import Image from "next/image";
import {
  ArrowPathRoundedSquareIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/solid";
import QRCodeGenerator from "../CardQrCode";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import useToast from "@/hooks/useToast";

export default function CardFront({ toggleCard, user, design }) {
  const { Info } = useToast();

  const backgroundColor =
    design === "white" ? "bg-primary-white" : "bg-primary-black";
  const textColor =
    design === "white" ? "text-primary-black" : "text-primary-white";
  const accountNoColor =
    design === "white" ? "text-[#1c1d22cc]" : "text-[#CCC]";
  const eminenceColor =
    design === "white" ? "text-[#1c1d22cc]" : "text-[#ffffffcc]";

  return (
    <div
      className={`${backgroundColor} relative overflow-hidden w-[320px] h-[436px] shadow-md shadow-white/40 rounded-2xl prevent-select`}
    >
      <div className="absolute w-[600px] h-[600px] -top-[62px] -left-[18px]">
        <Image
          src="/images/logo.png"
          width={377}
          height={377}
          alt=""
          className="w-full h-full z-0 relative"
          style={{ opacity: 0.3 }}
        />
      </div>

      <div className="w-full h-full flex flex-row items-center gap-4">
        <div
          className={`${eminenceColor} font-bold text-lg rotate-180 pr-3`}
          style={{
            writingMode: "vertical-rl",
          }}
        >
          Eminence Wallet
        </div>

        <div className="w-7 h-full bg-primary/60"></div>

        <div className=" w-full h-full flex flex-col justify-between items-end px-3 py-3">
          <button
            onClick={() => toggleCard()}
            className="hover:cursor-pointer z-20"
          >
            <ArrowPathRoundedSquareIcon className={`${textColor} h-8 w-8 `} />
          </button>

          {user ? (
            <div className="z-10 relative">
              <QRCodeGenerator
                remainingRoute={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${user.pubkey}`}
                height={176}
                width={176}
                bgColor={"transparent"}
                color={user.cardColor !== "black" ? "#1ecbb9" : "#6CCBB9"}
              />
            </div>
          ) : (
            <div className="w-44 h-44 rounded-sm bg-black/40 skeleton"></div>
          )}

          <div className="relative flex gap-[12px] items-center z-10">
            {user ? (
              <>
                <ProfileAvatar
                  style={{ width: "3.5rem", height: "3.5rem" }}
                  id={user?.avatarId}
                />

                <div className="flex flex-col justify-center">
                  <h3
                    className={`${textColor} text-[18px] font-bold max-w-[130px] whitespace-nowrap overflow-hidden`}
                    style={{ textOverflow: "ellipsis", overflow: "hidden" }}
                  >
                    {user.firstName + " " + user.lastName}
                  </h3>

                  <button
                    className={`flex flex-start items-center text-[12px] hover:cursor-pointer ${accountNoColor}`}
                    onClick={() => {
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
    </div>
  );
}
