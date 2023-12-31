import LoadingElement from "@src/components/LoadingElement";
import GlobalContext from "@src/context/GlobalContextProvider";
import { UserObject } from "@src/objects/UserObject";
import { AuthServices } from "@src/services/AuthServices";
import { ApiInvoke } from "@src/services/api/api.invoke";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Takes care of the OAuth2 flow.
 * @param {string} authorizationCode - Authorization code.
 * @param {string} yourClientId - Client id.
 * @param {string} yourClientSecret - Client secret.
 * @param {string} yourRedirectUri - Redirect uri.
 * @returns {Promise<void>} Nothing.
 */
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
    providerId: email.sub,
    refreshToken: respBody.refresh_token,
  };
}

/**
 * GoogleOAuth page takes care of sending the user on the right page when logging in with google.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <GoogleOAuth />
 *
 * @returns {JSX.Element} Rendered page.
 */
export default function GoogleOAuth() {
  const { setUser } = GlobalContext();
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
      navigate("/my-applets");
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
