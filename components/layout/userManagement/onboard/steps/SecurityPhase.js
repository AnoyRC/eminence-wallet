import Mnemonic from "../../Mnemonic";
import Form from "../../Form";
import { SecurityPhaseBtn } from "../FormBtn";
import Webcam from "react-webcam";
import CameraInterface from "../CameraInterface";

const SecurityPhase = () => {
  return (
    <Form
      heading={"Image Based Wallet"}
      paragraph={
        "Generate wallet from any image or capture and simply save it securely. It's your key to protecting your assets. "
      }
    >
      <div className="mb-8 w-full">
        <CameraInterface />
      </div>

      <SecurityPhaseBtn />
    </Form>
  );
};

export default SecurityPhase;
