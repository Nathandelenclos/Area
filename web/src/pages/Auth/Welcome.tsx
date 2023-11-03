import React, { useEffect } from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import ConnectionButtons from "@components/ConnectionButtons";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import LoadingElementPopUp from "@src/components/LoadingElementPopUp";

export default function Welcome() {
  const { translate } = AppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/home-page");
    }
  }, []);

  return (
    <AuthViewContainer ContainerTitle={translate("welcome")}>
      <ConnectionButtons
        NavigateToSignIn={() => navigate("/sign-in")}
        NavigateToSignUp={() => navigate("/sign-up")}
      />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
