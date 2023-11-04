"use client";

import { useState } from "react";
import Form from "../userManagement/Form";
import { CheckLoginBtn, WelcomeBtn } from "../userManagement/routes/FormBtn";
import { WelcomeInput } from "../userManagement/routes/FormInput";
import UserForm from "../userManagement/UserForm";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { togglePopup } from "@/redux/checkLoginSlice";

const Login = () => {
  const [password, setPassword] = useState("");
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-lg backdrop-filter z-20 flex flex-col items-center justify-center">
      <UserForm>
        <Form
          heading={"Eminence Welcomes You!"}
          paragraph={
            "Please enter your password to unlock and access Eminence securely."
          }
        >
          <WelcomeInput password={password} setPassword={setPassword} />
          <CheckLoginBtn password={password} />
        </Form>
      </UserForm>
    </div>
  );
};

const CreateWallet = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-lg backdrop-filter z-20 flex flex-col items-center justify-center">
      <UserForm>
        <Form
          heading={"Wallet Not Found!"}
          paragraph={
            "Begin your journey by setting up your wallet, whether it's creating a new one or importing an existing wallet."
          }
        ></Form>
        <Button
          label="Get Started"
          fullWidth
          color="bg-primary-black text-primary-white"
          style="font-bold text-base rounded-lg py-3 "
          onClick={() => {
            dispatch(togglePopup(false));
            router.push("/onboard");
          }}
        />
      </UserForm>
    </div>
  );
};

export default function CheckLogin() {
  const isLogged = useSelector((state) => state.checkLogin.isLogged);
  const isPopup = useSelector((state) => state.checkLogin.isPopup);
  return (
    isPopup && (
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-lg backdrop-filter z-20 flex flex-col items-center justify-center">
        {isLogged ? <Login /> : <CreateWallet />}
      </div>
    )
  );
}
