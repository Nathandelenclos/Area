import AuthViewContainer from "@components/AuthViewContainer";
import ConnectionButtons from "@components/ConnectionButtons";
import OAuthButtons from "@components/OAuthButtons";
import GlobalContext from "@src/context/GlobalContextProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Welcome page displays the welcome view.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <Welcome />
 *
 * @returns {JSX.Element} Rendered page.
 */
export default function Welcome() {
  const { translate } = GlobalContext();
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
