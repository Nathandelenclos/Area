export const getFacebookUrl = () => {
  const authEndpoint = "https://www.facebook.com/v13.0/dialog/oauth";

  const redirectUrl = encodeURIComponent(
    "http://localhost:3000/api/sessions/oauth/facebook",
  );

  const clientId = encodeURIComponent("1310756783142754");

  const scopes = ["email", "public_profile"];

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
    ",",
  )}`;

  return loginUrl;
};
