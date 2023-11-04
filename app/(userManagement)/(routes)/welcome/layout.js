import UserForm from "@/components/layout/userManagement/UserForm";
import Heading from "@/components/layout/userManagement/Heading";

export const metadata = {
  title: "Eminence | Welcome Back",
  description: "Welcome to Eminence Wallet",
};

export default function WelcomeLayout({ children }) {
  return (
    <section className="flex items-center justify-center flex-col h-screen w-screen overflow-y-auto">
      <Heading text={"Return to Your Crypto Kingdom"} />
      <UserForm>{children}</UserForm>
    </section>
  );
}
