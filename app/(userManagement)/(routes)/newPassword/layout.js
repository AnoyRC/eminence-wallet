import UserForm from "@/components/layout/userManagement/UserForm";
import Heading from "@/components/layout/userManagement/Heading";

export const metadata = {
  title: "Eminence | New Password",
  description: "Add a new password",
};

export default function NewPasswordLayout({ children }) {
  return (
    <section className="flex items-center justify-center flex-col h-screen w-screen overflow-y-auto">
      <Heading text={"Fortify Your Crypto Kingdom"} />
      <UserForm>{children}</UserForm>
    </section>
  );
}
