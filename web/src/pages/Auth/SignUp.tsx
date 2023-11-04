import React from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import SignUpForms from "@components/SignUpForms";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "@src/services/AuthServices";
import { UserObject } from "@src/objects/UserObject";

export default function SignUp() {
  const { translate, setUser } = AppContext();
  const navigate = useNavigate();

  const register = async (name: string, email: string, password: string) => {
    const response = await AuthServices.register(name, email, password);
    if (response.data) {
      setUser(new UserObject(response.data));
      navigate("/create-applet");
    }
  };

  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-up")}>
      <SignUpForms onSignUp={register} />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
