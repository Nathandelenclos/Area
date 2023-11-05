export const getGoogleUrl = (from: string) => {
  const rootUrl = <string>process.env.REACT_APP_GOOGLE_OAUTH_ROOT_URL;

  const options = {
    redirect_uri: <string>process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URI,
    client_id: <string>process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "email",
      "profile",
      "openid",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://mail.google.com/",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};
