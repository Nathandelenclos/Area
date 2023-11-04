import React, { useEffect } from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import SignUpForms from "@components/SignUpForms";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "@src/services/AuthServices";
import { UserObject } from "@src/objects/UserObject";

/**
 * SignUp page displays the sign up view.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <SignUp />
 *
 * @returns {JSX.Element} Rendered page.
 */
export default function SignUp() {
  const { translate, setUser } = AppContext();
  const navigate = useNavigate();

  /**
   * Check if the user is already logged in.
   * If the user is already logged in, redirect him to the home page.
   */
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/home-page");
    }
  }, []);

  /**
   * Register is called when the user press the sign up button.
   * If the user press the sign up button, the register function is called.
   *
   * @param {name} string - Name of the user.
   * @param {email} string - Email of the user.
   * @param {password} string - Password of the user.
   */
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
