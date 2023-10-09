import React from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import SignUpForms from "@components/SignUpForms";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";
import { navigate } from "@src/utils";

export default function SignUp() {
  const { translate, setUser } = AppContext();

  const signUp = async (fullName: string, email: string, password: string) => {
    const responseRegister = await fetch(
      `http://localhost:3000/auth/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: fullName, email, password }),
      },
    );
    const dataRegister = await responseRegister.json();
    const responseLogin = await fetch(`http://localhost:3000/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const dataLogin = await responseLogin.json();
    if (responseLogin.status == 200) {
      setUser({
        email: email,
        name: fullName,
        accessToken: dataLogin.data.accessToken,
      });
      // navigate("my-applets");
    }
  };

  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-up")}>
      <SignUpForms
        SignUp={(fullName, email, password) =>
          signUp(fullName, email, password)
        }
      />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
