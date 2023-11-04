import Logo from "@/components/ui/Logo";
import LaunchApp from "./LaunchApp";

const NavBar = () => {
  return (
    <nav className="flex justify-between pt-6">
      <Logo className="lg:pl-9" textColor="#1C1D22" />
      <LaunchApp />
    </nav>
  );
};

export default NavBar;
