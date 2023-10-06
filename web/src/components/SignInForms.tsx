import React from "react";
import MainButton from "@components/MainButton";
import AuthInput from "@components/AuthInput";

function SignInForms() {
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const SignIn = () => {
    //TODO: Add sign in logic
    window.location.href = "/create-applet";
  };
  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <AuthInput
        placeholder={"Email"}
        value={Email}
        setValue={setEmail}
        type={"email"}
      />
      <AuthInput
        placeholder={"Password"}
        value={Password}
        setValue={setPassword}
        type={"password"}
      />
      <MainButton title={"Sign In"} onPress={SignIn} />
      <p
        onClick={() => {
          window.location.href = "/sign-in/recover-password";
        }}
        className="text-[#7A73E7] cursor-pointer"
      >
        Forgot password ?
      </p>
    </div>
  );
}

export default SignInForms;
