import React from "react";
import MainButton from "@components/MainButton";
import AuthInput from "@components/AuthInput";
import AppContext from "@src/context/AppContextProvider";

type SignInFormsProps = {
  SignIn?: (email: string, password: string) => void;
  RecoverPassword?: () => void;
};

function SignInForms({
  SignIn = (email, password) => {
    console.log(email, password);
    window.location.href = "/create-applet";
  },
  RecoverPassword = () => {
    window.location.href = "/sign-in/recover-password";
  },
}: SignInFormsProps) {
  const [Email, setEmail] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const { translate } = AppContext();

  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <AuthInput
        placeholder={translate("login", "email")}
        value={Email}
        setValue={setEmail}
        type={"email"}
      />
      <AuthInput
        placeholder={translate("login", "password")}
        value={Password}
        setValue={setPassword}
        type={"password"}
      />
      <MainButton
        title={translate("login", "sign-in")}
        onPress={() => SignIn(Email, Password)}
      />
      <p onClick={RecoverPassword} className="text-[#7A73E7] cursor-pointer">
        {translate("login", "recoverPassword")}
      </p>
    </div>
  );
}

export default SignInForms;
