"use client";
import React, { useRef, useEffect } from "react";

const QRCodeGenerator = ({
  remainingRoute,
  width,
  height,
  bgColor,
  color = "#6CCBB9",
}) => {
  const ref = useRef(null);

  useEffect(() => {
    // Check if we are in the browser environment before using the QRCodeStyling library
    if (typeof window !== "undefined") {
      import("qr-code-styling").then(({ default: QRCodeStyling }) => {
        const fullRoute = `${remainingRoute}`;
        const qrCode = new QRCodeStyling({
          width: width,
          height: height,
          type: "svg",
          image: "/images/logo.png",
          shape: "rounded",
          dotsOptions: {
            color: color,
            type: "rounded",
          },
          backgroundOptions: {
            color: bgColor ? bgColor : "transparent",
          },
          cornersSquareOptions: {
            type: "extra-rounded",
          },
        });

        qrCode.update({
          data: fullRoute,
        });

        qrCode.append(ref.current);
      });
    }
  }, [remainingRoute]);

  return <div ref={ref} />;
};

export default QRCodeGenerator;
