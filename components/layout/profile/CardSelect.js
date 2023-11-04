"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import { CheckIcon } from "@heroicons/react/24/solid";
import usePostServer from "@/hooks/usePostServer";
import { useSelector } from "react-redux";

const myFont = localFont({
  src: "../../../public/fonts/Satoshi-Variable.woff2",
});

export default function CardSelect() {
  const [selectedCard, setSelectedCard] = useState(0);
  const { updateCardColor } = usePostServer();
  const user = useSelector((state) => state.profile.user);

  useEffect(() => {
    if (user) {
      setSelectedCard(user.cardColor === "white" ? 0 : 1);
    }
  }, [user]);

  return (
    <div
      className="w-full rounded-[8px] p-[0.5px]"
      style={{
        background: "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
      }}
    >
      <Card className={"h-full w-full rounded-[8px] bg-black pb-[5px]"}>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none bg-transparent"
        >
          <div className=" flex flex-col justify-between items-center gap-8 pb-1 relative">
            <div>
              <Typography
                variant="h2"
                color="white"
                className={myFont.className}
              >
                Update Card Color
              </Typography>
              <Typography
                color="white"
                className={"mt-1 font-normal text-center " + myFont.className}
              >
                Select your card color
              </Typography>
            </div>
          </div>
        </CardHeader>

        <CardBody className=" flex w-full justify-between">
          <div
            className="flex flex-col gap-[30px] justify-center items-center w-[50%] hover:cursor-pointer"
            onClick={() => {
              if (user.cardColor !== "white") updateCardColor("white");
            }}
          >
            <CardContainer
              color="bg-primary-black"
              design={"white"}
              user={user}
            />
            <div
              className="w-[60px] h-[30px] rounded-[4px] p-[0.5px] relative"
              style={{
                background:
                  "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
              }}
            >
              <div className="w-full h-full rounded-[4px] bg-white"></div>
              {selectedCard === 0 && (
                <div
                  className="absolute -top-[7px] -right-[7px] w-[20px] h-[20px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
                  }}
                >
                  <CheckIcon className="h-[14px] w-[14px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black" />
                </div>
              )}
            </div>
          </div>
          <div
            className="flex flex-col gap-[30px] justify-center items-center w-[50%] hover:cursor-pointer"
            onClick={() => {
              if (user.cardColor !== "black") updateCardColor("black");
            }}
          >
            <CardContainer color="bg-primary-black" user={user} />
            <div
              className="w-[60px] h-[30px] rounded-[4px] p-[0.5px] relative"
              style={{
                background:
                  "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
              }}
            >
              <div className="w-full h-full rounded-[4px] bg-black"></div>
              {selectedCard === 1 && (
                <div
                  className="absolute -top-[7px] -right-[7px] w-[20px] h-[20px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(261deg, #26FFFF 5.76%, #4AFF93 94.17%)",
                  }}
                >
                  <CheckIcon className="h-[14px] w-[14px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black" />
                </div>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
