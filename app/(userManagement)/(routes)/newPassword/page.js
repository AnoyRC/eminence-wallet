import Form from "@/components/layout/userManagement/Form";
import { NewPasswordBtn } from "@/components/layout/userManagement/routes/FormBtn";
import { NewPasswordInput } from "@/components/layout/userManagement/routes/FormInput";

export default function NewPassword() {
  return (
    <Form
      heading={"Set Password Again"}
      paragraph={
        "Establish your access credentials by setting up your password for your wallet."
      }
    >
      <NewPasswordInput />
    </Form>
  );
}
