import React from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import ConnectionButtons from "@components/ConnectionButtons";
import OAuthButtons from "@components/OAuthButtons";

export default function Welcome() {
  return (
    <AuthViewContainer ContainerTitle={"Welcome to Area !"}>
      <ConnectionButtons />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
