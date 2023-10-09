import React from "react";
import SignInForms from "@components/SignInForms";
import AuthViewContainer from "@components/AuthViewContainer";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";

export default function SignIn() {
  const { translate } = AppContext();
  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-in")}>
      <SignInForms />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
