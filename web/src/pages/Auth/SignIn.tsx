import AuthViewContainer from "@components/AuthViewContainer";
import OAuthButtons from "@components/OAuthButtons";
import SignInForms from "@components/SignInForms";
import GlobalContext from "@src/context/GlobalContextProvider";
import { UserObject } from "@src/objects/UserObject";
import { AuthServices } from "@src/services/AuthServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const { translate, setUser } = GlobalContext();
  const navigate = useNavigate();

  /**
   * Check if the user is already logged in.
   * If the user is already logged in, redirect him to the home page.
   */
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/my-applets");
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
    if (data.status === 200) {
      setUser(new UserObject(data.data));
      localStorage.setItem("accessToken", data.data.token);
      const token = data.data.token;
      const me = await AuthServices.me(token);
      console.log(me);
      if (data.status === 200) {
        setUser(
          new UserObject({
            email: me.data.email,
            name: me.data.name,
            token,
            oauth: me.data.oauth,
          }),
        );
      }
      navigate("/my-applets");
    } else {
      navigate("/");
    }
  };

  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-in")}>
      <SignInForms onSignIn={login} />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
