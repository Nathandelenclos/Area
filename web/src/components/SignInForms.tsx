import React, { useEffect } from "react";
import MainButton from "@components/MainButton";
import AuthInput from "@components/AuthInput";
import GlobalContext from "@src/context/GlobalContextProvider";
import LoadingElementPopUp from "./LoadingElementPopUp";

type SignInFormsProps = {
  onSignIn: (email: string, password: string) => Promise<void>;
  onRecoverPassword?: () => void;
};

function SignInForms({ onSignIn, onRecoverPassword }: SignInFormsProps) {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  const { translate } = GlobalContext();

  useEffect(() => {
    addEventListener("keydown", onEnterPressed);
    return () => {
      removeEventListener("keydown", onEnterPressed);
    };
  });

  const onEnterPressed = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      onSignIn(email, password).then(() => setIsClicked(false));
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
      {!isClicked ? (
        <MainButton
          title={translate("login", "sign-in")}
          onPress={() => {
            setIsClicked(true);
            onSignIn(email, password).then(() => setIsClicked(false));
          }}
        />
      ) : (
        <LoadingElementPopUp />
      )}
      <p onClick={onRecoverPassword} className="text-[#7A73E7] cursor-pointer">
        {translate("login", "recoverPassword")}
      </p>
    </div>
  );
}

export default SignInForms;
