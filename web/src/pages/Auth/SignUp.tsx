import React from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import SignUpForms from "@components/SignUpForms";
import OAuthButtons from "@components/OAuthButtons";

export default function SignUp() {
  return (
    <AuthViewContainer ContainerTitle={"Sign Up"}>
      <SignUpForms />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
