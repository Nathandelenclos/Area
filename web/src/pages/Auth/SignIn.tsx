import SignInForms from "@components/SignInForms";
import AuthViewContainer from "@components/AuthViewContainer";
import OAuthButtons from "@components/OAuthButtons";
import AppContext from "@src/context/AppContextProvider";
import { AuthServices } from "@src/services/AuthServices";
import { useNavigate } from "react-router-dom";
import { UserObject } from "@src/objects/UserObject";

export default function SignIn() {
  const { translate, setUser } = AppContext();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const data = await AuthServices.login(email, password);
    if (data.status === 200) {
      setUser(new UserObject(data.data));
      navigate("/applets");
    }
  };

  return (
    <AuthViewContainer ContainerTitle={translate("login", "sign-in")}>
      <SignInForms onSignIn={login} />
      <OAuthButtons />
    </AuthViewContainer>
  );
}
