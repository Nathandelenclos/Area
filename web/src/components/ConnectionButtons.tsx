import React from "react";
import MainButton from "@components/MainButton";
import AppContext from "@src/context/AppContextProvider";

type ConnectionButtonsProps = {
  NavigateToSignIn?: () => void;
  NavigateToSignUp?: () => void;
};

export default function ConnectionButtons({
  NavigateToSignIn = () => {
    window.location.href = "/sign-in";
  },
  NavigateToSignUp = () => {
    window.location.href = "/sign-up";
  },
}: ConnectionButtonsProps) {
  const { translate } = AppContext();
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
