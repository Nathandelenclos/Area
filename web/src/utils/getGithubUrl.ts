export const getGithubUrl = (from: string) => {
  const rootURl = "https://github.com/login/oauth/authorize";

  const clientId = <string>process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
  const redirectUri = <string>process.env.REACT_APP_GITHUB_OAUTH_REDIRECT_URI;

  const options = {
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: ["identity", "user:email", "read:user"].join(" "),
  };

  const qs = new URLSearchParams(options);

  return `${rootURl}?${qs.toString()}`;
};
