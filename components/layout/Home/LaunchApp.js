"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LaunchApp = () => {
  const router = useRouter();

  const check = () => {
    const secretPair = localStorage.getItem("secret");
    if (secretPair) router.push("/welcome");
    else router.push("/onboard");
  };

  return (
    <button className="relative z-10 group-hover:scale-105" onClick={check}>
      <div className="w-[120px] h-[22px] sm:w-[170px] sm:h-[35px] md:w-[180px] md:h-[40px] lg:w-[200px] lg:h-[50px] absolute -top-5 right-0">
        <Image
          src="/images/home/launch-button.svg"
          width={200}
          height={50}
          layout="responsive"
          alt="launch app"
        />
        <p className="text-primary-white text-base sm:text-xl md:text-2xl lg:text-2xl font-bold absolute tinset-0 flex items-center justify-center w-full text-center group-hover:scale-105 top-12 right-0">
          Launch App
        </p>
      </div>
    </button>
  );
};

export default LaunchApp;
