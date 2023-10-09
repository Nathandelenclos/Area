import React, { useEffect } from "react";

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
  console.log(respBody);

  if (respBody.access_token) {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${respBody.access_token}`,
    );
    const email = await response.json();
    console.log("email: ", email);
  }
}

export default function GoogleOAuth() {
  const queryToObject = (query: any) => {
    const parameters = new URLSearchParams(query);
    return Object.fromEntries(parameters.entries());
  };

  useEffect(() => {
    const payload = queryToObject(window.location.search.split("?")[1]);
    const state = payload && payload.state;
    const error = payload && payload.error;

    console.log(payload);
    console.log(state);
    console.log(error);
    test(
      payload.code,
      "485338230618-jg4n220ki98qa1c5psndcbea1vqpqrsi.apps.googleusercontent.com",
      "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",
      "http://localhost:3000/api/sessions/oauth/google",
    );
  }, []);
  return (
    <div>
      <p>Test</p>
    </div>
  );
}
