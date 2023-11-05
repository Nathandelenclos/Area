import LoadingElement from "@src/components/LoadingElement";
import { ApiInvoke } from "@src/services/api/api.invoke";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

async function test(
  authorizationCode: string,
  yourClientId: string,
  yourClientSecret: string,
  yourRedirectUri: string,
) {
  const tokenEndpoint = process.env.REACT_APP_GOOGLE_OAUTH_TOKEN_ENDPOINT || "";

  const requestBody = new URLSearchParams({
    code: authorizationCode,
    client_id: yourClientId,
    client_secret: yourClientSecret,
    redirect_uri: yourRedirectUri,
    grant_type: "authorization_code",
  });

  const resp = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: requestBody,
  });

  const respBody = await resp.json();

  let email;
  if (respBody.access_token) {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${respBody.access_token}`,
    );
    email = await response.json();
  }

  console.log(respBody);
  return {
    email: email.email,
    providerId: respBody.id_token,
    refreshToken: respBody.refresh_token,
  };
}

export default function GoogleOAuth() {
  const queryToObject = (query: any) => {
    const parameters = new URLSearchParams(query);
    return Object.fromEntries(parameters.entries());
  };

  const navigate = useNavigate();

  async function getData() {
    const payload = queryToObject(window.location.search.split("?")[1]);

    const data = await test(
      payload.code,
      process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "",
      process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET || "",
      process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URI || "",
    );

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
        provider: "google",
      }),
    });
    if (resp.status === 200) {
      localStorage.setItem("accessToken", data.refreshToken);
      navigate("/home-page");
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoadingElement />
    </div>
  );
}
