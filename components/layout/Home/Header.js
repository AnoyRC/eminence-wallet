import Image from "next/image";
import NavBar from "./NavBar";
import Heading from "./Heading";

const Header = () => {
  return (
    <header className="text-primary-black relative pb-32">
      <NavBar />

      <Image
        src="/images/home/divider.svg"
        fill
        objectFit="contain"
        alt="launch app"
        className="absolute w-full h-full prevent-select inset-0"
      />
      <Heading />
      <Image
        src="/images/home/scroll-down.svg"
        width={50}
        height={88}
        alt="scroll down"
        className="mt-32 mx-auto z-10 relative prevent-select"
      />
    </header>
  );
};

export default Header;
