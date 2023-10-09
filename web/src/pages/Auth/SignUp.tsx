import React from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import SignUpForms from "@components/SignUpForms";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";
import { navigate } from "@src/utils";
import { AuthServices } from "@src/services/AuthServices";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { translate, setUser } = AppContext();
  const navigate = useNavigate();

  const register = async (name: string, email: string, password: string) => {
    const data = await AuthServices.register(name, email, password);
    if (data) {
      setUser(data.data);
      navigate("/create-applet");
    }
  };

  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-up")}>
      <SignUpForms SignUp={register} />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
