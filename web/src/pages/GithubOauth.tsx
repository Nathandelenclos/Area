import { ApiInvoke } from "@services/api/api.invoke";
import LoadingElement from "@src/components/LoadingElement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

async function getAuthorizationCodeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");
  const clientId = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.REACT_APP_GITHUB_OAUTH_REDIRECT_URI;

  console.log(authorizationCode);

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

export const LoginUserGithub = () => {
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
      navigate("/");
    } else {
      navigate("/login");
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
