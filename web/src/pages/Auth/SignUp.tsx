import React, { useEffect } from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import SignUpForms from "@components/SignUpForms";
import OAuthButtons from "@components/OAuthButtons";
import GlobalContext from "@src/context/GlobalContextProvider";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "@src/services/AuthServices";
import { UserObject } from "@src/objects/UserObject";

export default function SignUp() {
  const { translate, setUser } = GlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/home-page");
    }
  }, []);

  const register = async (name: string, email: string, password: string) => {
    const data = await AuthServices.register(name, email, password);
    console.log(data);
    if (data.status == 200) {
      setUser(new UserObject(data.data));
      AuthServices.storeToken(data.data.token);
      navigate("/home-page");
    }
  };

  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-up")}>
      <SignUpForms onSignUp={register} />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
