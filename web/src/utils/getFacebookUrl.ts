export const getFacebookUrl = () => {
  const authEndpoint = "https://www.facebook.com/v18.0/dialog/oauth";

  const redirectUrl = encodeURIComponent(
    "http://localhost:3000/api/sessions/oauth/facebook",
  );

  const clientId = encodeURIComponent("1310756783142754");

  const scopes = ["public_profile", "email"];

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=${scopes.join(
    ",",
  )}`;

  return loginUrl;
};
