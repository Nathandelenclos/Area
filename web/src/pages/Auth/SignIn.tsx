import SignInForms from "@components/SignInForms";
import AuthViewContainer from "@components/AuthViewContainer";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";
import { AuthServices } from "@src/services/AuthServices";
import { useNavigate } from "react-router-dom";
import { UserObject } from "@src/objects/UserObject";
import { useEffect } from "react";

/**
 * SignIn page displays the sign in view.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <SignIn />
 *
 * @returns {JSX.Element} Rendered page.
 */
export default function SignIn() {
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
   * login is called when the user press the sign in button.
   * If the user press the sign in button, the login function is called.
   *
   * @param {email} string - Email of the user.
   * @param {password} string - Password of the user.
   */
  const login = async (email: string, password: string) => {
    const data = await AuthServices.login(email, password);
    console.log(data);
    if (data.status === 200) {
      setUser(new UserObject(data.data));
      AuthServices.storeToken(data.data.token);
      navigate("/home-page");
    }
  };

  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-in")}>
      <SignInForms onSignIn={login} />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
