import React from "react";
import SignInForms from "@components/SignInForms";
import AuthViewContainer from "@components/AuthViewContainer";
import OAuthButtons from "@components/OAuthButtons";

export default function SignIn() {
  return (
    <AuthViewContainer ContainerTitle="Sign In">
      <SignInForms />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
