import React from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import ConnectionButtons from "@components/ConnectionButtons";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";

export default function Welcome() {
  const { translate } = AppContext();
  return (
    <AuthViewContainer ContainerTitle={translate("welcome")}>
      <ConnectionButtons />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
