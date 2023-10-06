import React, { useState } from "react";
import MainButton from "@components/MainButton";
import AuthInput from "@components/AuthInput";

function SignUpForms() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SignUp = () => {
    //TODO: Implement sign up logic
    window.location.href = "/create-applet";
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <AuthInput
        placeholder={"Full Name"}
        value={fullName}
        setValue={setFullName}
      />
      <AuthInput
        placeholder={"Email"}
        value={email}
        setValue={setEmail}
        type={"email"}
      />
      <AuthInput
        placeholder={"Password"}
        value={password}
        setValue={setPassword}
        type={"password"}
      />
      <MainButton title={"Sign up"} onPress={SignUp} />
      <p className="w-3/5 mb-5 text-center">
        By creating an account you accept our{" "}
        <a className="text-[#7A73E7]">Terms of services</a> and{" "}
        <a className="text-[#7A73E7]">Privacy policy</a>.
      </p>
    </div>
  );
}

export default SignUpForms;
