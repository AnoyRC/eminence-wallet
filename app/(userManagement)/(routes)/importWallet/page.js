import Form from "@/components/layout/userManagement/Form";
import SecurityInput from "@/components/layout/userManagement/onboard/SecurityInput";
import { ImportWalletBtn } from "@/components/layout/userManagement/routes/FormBtn";

export default function ImportWallet() {
  return (
    <Form
      heading={"Enter Your Secret Cipher"}
      paragraph={
        "Enter your secret security phrase to access your account securely and continue your crypto journey."
      }
    >
      <SecurityInput importWallet={true} />
    </Form>
  );
}
