import UserForm from "@/components/layout/userManagement/UserForm";
import Heading from "@/components/layout/userManagement/Heading";

export const metadata = {
  title: "Eminence | Public Profile",
  description: "Create a public profile",
};

export default function PublicProfileLayout({ children }) {
  return (
    <section className="flex items-center justify-center flex-col w-screen min-h-screen">
      <Heading text={"Carve Your Crypto Persona"} />
      <UserForm>{children}</UserForm>
    </section>
  );
}
