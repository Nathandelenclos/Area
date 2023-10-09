import React from "react";
import SignInForms from "@components/SignInForms";
import AuthViewContainer from "@components/AuthViewContainer";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";
import { AuthServices } from "@src/services/AuthServices";

export default function SignIn() {
  const { translate } = AppContext();
  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-in")}>
      <SignInForms />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
