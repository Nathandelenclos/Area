import React, { useEffect } from "react";
import MainButton from "@components/MainButton";
import AuthInput from "@components/AuthInput";
import GlobalContext from "@src/context/GlobalContextProvider";
import LoadingElementPopUp from "./LoadingElementPopUp";

/**
 * SignInFormsProps props for the SignInForms components.
 * @interface SignInFormsProps
 */
type SignInFormsProps = {
  onSignIn: (email: string, password: string) => Promise<void>;
  onRecoverPassword?: () => void;
};

/**
 * SignInForms component displays the sign in forms.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <SignInForms
 *   onSignIn={onSignIn}
 *   onRecoverPassword={onRecoverPassword}
 * />
 *
 * @param {SignInFormsProps} props - list of every services offered.
 * @returns {JSX.Element} Rendered component.
 */
function SignInForms({ onSignIn, onRecoverPassword }: SignInFormsProps) {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  const { translate } = GlobalContext();

  /**
   * Add an event listener to the window to detect when the user press the enter key.
   * If the user press the enter key, the onSignIn function is called.
   */
  useEffect(() => {
    addEventListener("keydown", onEnterPressed);
    return () => {
      removeEventListener("keydown", onEnterPressed);
    };
  });

  /**
   * onEnterPressed is called when the user press the enter key.
   * If the user press the enter key, the onSignIn function is called.
   *
   * @param {KeyboardEvent}
   */
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
