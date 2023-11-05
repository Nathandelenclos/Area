/**
 * Returns the Facebook login URL.
 * @returns {string} The Facebook login URL
 */
export const getFacebookUrl = () => {
  const authEndpoint = "https://www.facebook.com/v18.0/dialog/oauth";

  const redirectUrl = process.env
    .REACT_APP_FACEBOOK_OAUTH_REDIRECT_URI as string;

  const clientId = process.env.REACT_APP_FACEBOOK_OAUTH_CLIENT_ID;

  const scopes = ["public_profile", "email"];

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=token&scope=${scopes.join(
    ",",
  )}`;

  return loginUrl;
};
