import React from "react";
import MainButton from "@components/MainButton";
import GlobalContext from "@src/context/GlobalContextProvider";

/**
 * Props for the ConnectionButtons component.
 * @interface ConnectionButtonsProps
 */
type ConnectionButtonsProps = {
  /**
   * Function to be executed when the sign-in button is clicked.
   */
  NavigateToSignIn?: () => void;
  /**
   * Function to be executed when the sign-up button is clicked.
   */
  NavigateToSignUp?: () => void;
};

/**
 * ConnectionButtons component displays the sign-in and sign-up buttons.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <ConnectionButtons
 *   NavigateToSignIn={() => {navigate("/sign-in")}}
 *   NavigateToSignUp={() => {navigate("/sign-up")}}
 * />
 *
 * @param {ConnectionButtonsProps} props - The properties of the component.
 * @returns {JSX.Element} Rendered component.
 */
export default function ConnectionButtons({
  NavigateToSignIn = () => {
    console.log("sign-in");
  },
  NavigateToSignUp = () => {
    console.log("sign-up");
  },
}: ConnectionButtonsProps) {
  const { translate } = GlobalContext();
  return (
    <div className="flex flex-col justify-center items-center">
      <MainButton
        title={translate("login", "sign-in")}
        onPress={NavigateToSignIn}
      />
      <MainButton
        title={translate("login", "sign-up")}
        reverse={true}
        onPress={NavigateToSignUp}
      />
    </div>
  );
}
