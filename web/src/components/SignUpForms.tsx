import { useEffect, useState } from "react";
import MainButton from "@components/MainButton";
import AuthInput from "@components/AuthInput";
import AppContext from "@src/context/AppContextProvider";
import LoadingElementPopUp from "./LoadingElementPopUp";

/**
 * SignUpFormsProps props for the SignUpForms components.
 * @interface SignUpFormsProps
 */
type SignUpFormsProps = {
  /**
   * Function to execute when user signs up
   * @param name - Name of the user
   * @param email - Email of the user
   * @param password - Password of the user
   * @returns - void
   */
  onSignUp: (name: string, email: string, password: string) => Promise<void>;
};

/**
 * SignUpForms component displays the sign up forms.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <SignUpForms
 *   onSignUp={onSignUp}
 * />
 *
 * @param {SignUpFormsProps} props - list of every services offered.
 * @returns {JSX.Element} Rendered component.
 */
function SignUpForms({ onSignUp }: SignUpFormsProps) {
  const { translate } = AppContext();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);

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
