"use client";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Experience = () => {
  const router = useRouter();

  const check = () => {
    const secretPair = localStorage.getItem("secretPair");
    if (secretPair) router.push("/welcome");
    else router.push("/onboard");
  };

  return (
    <div className="w-full h-screen relative bg-primary-white flex items-center justify-center flex-col">
      <div className="font-bold text-4xl sm:text-5xl md:text-6xl flex flex-col lg:text-8xl leading-normal text-center text-primary-black mb-6">
        <h1> Experience the </h1>
        <h1 className="mt-9">Future of Finance</h1>
        <h1>
          Unlock
          <span className="inline-flex items-center">
            <div className="w-[130px] h-[130px]sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]">
              <Image
                src="/images/logo.png"
                alt="Eminence Logo"
                width={200}
                height={200}
                layout="responsive"
                className="inline-block prevent-select"
              />
            </div>
          </span>
          Today
        </h1>
      </div>

      <Button
        label="Launch App"
        rounded
        color="text-primary-white"
        style="bg-primary px-7 py-3 font-bold prevent-select"
        onClick={check}
      />
    </div>
  );
};

export default Experience;
