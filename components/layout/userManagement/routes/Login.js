"use client";
import { useState } from "react";
import Form from "../Form";
import { WelcomeBtn } from "./FormBtn";
import { WelcomeInput } from "./FormInput";

const Login = () => {
  const [password, setPassword] = useState("");
  return (
    <Form
      heading={"Eminence Welcomes You!"}
      paragraph={
        "Please enter your password to unlock and access Eminence securely."
      }
    >
      <WelcomeInput password={password} setPassword={setPassword} />
      <WelcomeBtn password={password} />
    </Form>
  );
};

export default Login;
