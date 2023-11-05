import AuthViewContainer from "@components/AuthViewContainer";
import ConnectionButtons from "@components/ConnectionButtons";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const { translate } = AppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/home-page");
    }
  }, []);
  const onSuccess = (response: any) => console.log(response);
  const onFailure = (response: any) => console.error(response);

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
