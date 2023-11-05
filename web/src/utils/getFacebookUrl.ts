export const getFacebookUrl = () => {
  const authEndpoint = "https://www.facebook.com/v18.0/dialog/oauth";

  const redirectUrl = encodeURIComponent(
    "http://localhost:3000/api/sessions/oauth/facebook",
  );

  const clientId = process.env.REACT_APP_FACEBOOK_OAUTH_CLIENT_ID;

  const scopes = ["public_profile", "email"];

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=${scopes.join(
    ",",
  )}`;

  return loginUrl;
};
