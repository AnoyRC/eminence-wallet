import Form from "@/components/layout/userManagement/Form";
import ImageInput from "@/components/layout/userManagement/onboard/ImageInput";
import SecurityInput from "@/components/layout/userManagement/onboard/SecurityInput";
import { ImportWalletBtn } from "@/components/layout/userManagement/routes/FormBtn";

export default function ImportWallet() {
  return (
    <Form
      heading={"Import Your Image"}
      paragraph={
        "Upload your Image to access your account securely and continue your crypto journey."
      }
    >
      <ImageInput />
    </Form>
  );
}
