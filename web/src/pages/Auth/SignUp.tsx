import AuthViewContainer from "@components/AuthViewContainer";
import OAuthButtons from "@components/OAuthButtons";
import SignUpForms from "@components/SignUpForms";
import GlobalContext from "@src/context/GlobalContextProvider";
import { UserObject } from "@src/objects/UserObject";
import { AuthServices } from "@src/services/AuthServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
   * Register is called when the user press the sign up button.
   * If the user press the sign up button, the register function is called.
   *
   * @param name - Name of the user
   * @param email - Email of the user
   * @param password - Password of the user
   */
  const register = async (name: string, email: string, password: string) => {
    const data = await AuthServices.register(name, email, password);
    if (data.status == 200) {
      setUser(new UserObject(data.data));
      AuthServices.storeToken(data.data.token);
      navigate("/my-applets");
    }
  };

  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-up")}>
      <SignUpForms onSignUp={register} />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
