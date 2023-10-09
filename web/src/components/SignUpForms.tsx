import React, { useState } from "react";
import MainButton from "@components/MainButton";
import AuthInput from "@components/AuthInput";
import AppContext from "@src/context/AppContextProvider";

type SignUpFormsProps = {
  SignUp?: (fullName: string, email: string, password: string) => void;
};

function SignUpForms({
  SignUp = (fullName, email, password) => {
    console.log(fullName, email, password);
  },
}: SignUpFormsProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { translate } = AppContext();
  return (
    <div className="flex flex-col justify-center items-center">
      <AuthInput
        placeholder={translate("login", "fullName")}
        value={fullName}
        setValue={setFullName}
      />
      <AuthInput
        placeholder={translate("login", "email")}
        value={email}
        setValue={setEmail}
        type={"email"}
      />
      <AuthInput
        placeholder={translate("login", "password")}
        value={password}
        setValue={setPassword}
        type={"password"}
      />
      <MainButton
        title={translate("login", "sign-up")}
        onPress={() => SignUp(fullName, email, password)}
      />
    </div>
  );
}

export default SignUpForms;
