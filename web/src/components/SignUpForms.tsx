import { useEffect, useState } from "react";
import MainButton from "@components/MainButton";
import AuthInput from "@components/AuthInput";
import AppContext from "@src/context/AppContextProvider";
import LoadingElementPopUp from "./LoadingElementPopUp";

type SignUpFormsProps = {
  onSignUp: (name: string, email: string, password: string) => Promise<void>;
};

function SignUpForms({ onSignUp }: SignUpFormsProps) {
  const { translate } = AppContext();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    addEventListener("keydown", onEnterPressed);
    return () => {
      removeEventListener("keydown", onEnterPressed);
    };
  });

  const onEnterPressed = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      setIsClicked(true);
      onSignUp(name, email, password).then(() => setIsClicked(false));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <AuthInput
        placeholder={translate("login", "fullName")}
        value={name}
        setValue={setName}
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
      {!isClicked ? (
        <MainButton
          title={translate("login", "sign-up")}
          onPress={() => {
            setIsClicked(true);
            onSignUp(name, email, password).then(() => setIsClicked(false));
          }}
        />
      ) : (
        <LoadingElementPopUp />
      )}
    </div>
  );
}

export default SignUpForms;
