import LoadingElement from "@src/components/LoadingElement";
import React, { useEffect } from "react";
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
  const tokenEndpoint = "https://accounts.google.com/o/oauth2/token";

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
  // console.log(respBody);

  if (respBody.access_token) {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${respBody.access_token}`,
    );
    const email = await response.json();
    // console.log("email: ", email);
  }
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
  const queryToObject = (query: any) => {
    const parameters = new URLSearchParams(query);
    return Object.fromEntries(parameters.entries());
  };

  const navigate = useNavigate();

  /**
   * Get the authorization code from the url.
   * Send the authorization code to the backend.
   * If the authorization code is valid, redirect the user to the home page.
   */
  useEffect(() => {
    const payload = queryToObject(window.location.search.split("?")[1]);
    const state = payload && payload.state;
    const error = payload && payload.error;

    // console.log(payload);
    // console.log(state);
    // console.log(error);
    test(
      payload.code,
      "485338230618-jg4n220ki98qa1c5psndcbea1vqpqrsi.apps.googleusercontent.com",
      "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",
      "http://localhost:3000/api/sessions/oauth/google",
    );

    setTimeout(() => {
      navigate("/home-page");
    }, 5000);
    //todo: send code to backend
    //todo: login if suceccess and redirect home else redirect to login page
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoadingElement />
    </div>
  );
}
