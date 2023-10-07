import React from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import SignUpForms from "@components/SignUpForms";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";

export default function SignUp() {
  const { translate } = AppContext();
  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-up")}>
      <SignUpForms />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
