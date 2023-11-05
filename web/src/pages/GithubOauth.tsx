import LoadingElement from "@src/components/LoadingElement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiInvoke } from "@services/api/api.invoke";

async function getAuthorizationCodeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");
  const clientId = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_SECRET;
  const redirectUri = process.env.REACT_APP_GITHUB_OAUTH_REDIRECT_URI;

  console.log(clientId, clientSecret, redirectUri, authorizationCode);
  const response: Response = await fetch(
    `https://github.com/login/oauth/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        redirect_uri: redirectUri,
      }),
    },
  );

  console.log(response);
  const data = await response.json();

  return {
    email: data.email,
    providerId: data.id,
    refreshToken: data.refreshToken,
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
