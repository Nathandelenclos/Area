import React, { useEffect } from "react";
import MainButton from "@components/MainButton";
import AuthInput from "@components/AuthInput";
import AppContext from "@src/context/AppContextProvider";

type SignInFormsProps = {
  onSignIn?: (email: string, password: string) => void;
  onRecoverPassword?: () => void;
};

function SignInForms({
  onSignIn = Function,
  onRecoverPassword = Function,
}: SignInFormsProps) {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { translate } = AppContext();

  useEffect(() => {
    addEventListener("keydown", onEnterPressed);
    return () => {
      removeEventListener("keydown", onEnterPressed);
    };
  });

  const onEnterPressed = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onSignIn(email, password);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-5">
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
        title={translate("login", "sign-in")}
        onPress={() => onSignIn(email, password)}
      />
      <p onClick={onRecoverPassword} className="text-[#7A73E7] cursor-pointer">
        {translate("login", "recoverPassword")}
      </p>
    </div>
  );
}

export default SignInForms;
