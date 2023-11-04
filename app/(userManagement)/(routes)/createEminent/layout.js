import UserForm from "@/components/layout/userManagement/UserForm";
import Heading from "@/components/layout/userManagement/Heading";

export const metadata = {
  title: "Eminence | Create Profile",
  description: "Create your profile",
};

export default function EminentLayout({ children }) {
  return (
    <section className="flex items-center justify-center flex-col min-h-screen pt-10">
      <Heading text={"Join the Eminent Ranks"} />
      <UserForm>{children}</UserForm>
    </section>
  );
}
