import UserForm from "@/components/layout/userManagement/UserForm";
import Heading from "@/components/layout/userManagement/Heading";

export const metadata = {
  title: "Eminence | Import Wallet",
  description: "Import your wallet",
};

export default function ImportWalletLayout({ children }) {
  return (
    <section className="flex items-center justify-center flex-col h-screen w-screen overflow-y-auto">
      <Heading text={"Unlock Your Crypto Realm"} />
      <UserForm>{children}</UserForm>
    </section>
  );
}
