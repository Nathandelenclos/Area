import React from "react";
import SignInForms from "@components/SignInForms";
import AuthViewContainer from "@components/AuthViewContainer";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";
import { AuthServices } from "@src/services/AuthServices";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const { translate, setUser } = AppContext();
  const navigate = useNavigate();
  const login = async (email: string, password: string) => {
    const data = await AuthServices.login(email, password);
    if (data) {
      setUser(data.data);
      navigate("/create-applet");
    }
  };
  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-in")}>
      <SignInForms SignIn={login} />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
