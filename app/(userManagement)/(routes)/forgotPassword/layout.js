import UserForm from "@/components/layout/userManagement/UserForm";
import Heading from "@/components/layout/userManagement/Heading";

export const metadata = {
  title: "Eminence | Forgot Password",
  description: "Forgot Password",
};

export default function ForgotPasswordLayout({ children }) {
  return (
    <section className="flex items-center justify-center flex-col h-screen w-screen overflow-y-auto">
      <Heading text={"Forgot Password?"} />
      <UserForm>{children}</UserForm>
    </section>
  );
}
