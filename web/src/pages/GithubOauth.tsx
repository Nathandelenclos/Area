import { ApiInvoke } from "@services/api/api.invoke";
import LoadingElement from "@src/components/LoadingElement";
import GlobalContext from "@src/context/GlobalContextProvider";
import { UserObject } from "@src/objects/UserObject";
import { AuthServices } from "@src/services/AuthServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Get the authorization code from the URL.
 *
 * @returns {string} Authorization code.
 */
async function getAuthorizationCodeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");
  // const clientId = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
  // const clientSecret = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET;
  // const redirectUri = process.env.REACT_APP_GITHUB_OAUTH_REDIRECT_URI;

  // console.log(authorizationCode);

  // const formdata = new FormData();
  // formdata.append("client_id", "1f0cf209b216d7cdc81b");
  // formdata.append("client_secret", "9e8854c50d0d8962f1f5b6cf41210b2089520d7c");
  // formdata.append("code", "cd29348727e8d98ce246");

  // const requestOptions = {
  //   method: "POST",
  //   body: formdata,
  // };

  // fetch("https://github.com/login/oauth/access_token", requestOptions)
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));

  // const data = await response.json();

  return {
    email: "data.email",
    providerId: "data.id",
    refreshToken: " data.refreshToken",
  };
}

/**
 * LoginUserGithub page takes care of sending the user on the right page when logging in with github.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <LoginUserGithub />
 *
 * @returns {JSX.Element} Rendered page.
 */
export const LoginUserGithub = () => {
  const { setUser } = GlobalContext();
  const navigate = useNavigate();

  async function tryLogin() {
    const data = await getAuthorizationCodeFromURL();
    if (!data) {
      navigate("/");
      return;
    }
    const resp = await ApiInvoke({
      endpoint: "/auth/signoauth",
      method: "POST",
      expectedStatus: 200,
      body: JSON.stringify({
        ...data,
        provider: "github",
      }),
    });
    if (resp.status === 200) {
      setUser(new UserObject(resp.data));
      localStorage.setItem("accessToken", resp.data.token);
      const token = resp.data.token;
      const data = await AuthServices.me(token);
      console.log(data);
      if (data.status === 200) {
        setUser(
          new UserObject({
            email: data.data.email,
            name: data.data.name,
            token,
            oauth: data.data.oauth,
          }),
        );
      }
      navigate("/home-page");
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoadingElement />
    </div>
  );
};
