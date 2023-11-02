export const getGithubUrl = (from: string) => {
  const rootURl = "https://github.com/login/oauth/authorize";

  const options = {
    client_id: "be1c3a7f6cea4a6f733e",
    redirect_uri: "http://localhost:3000/api/sessions/oauth/github",
    scope: ["identity", "user:email", "read:user"].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootURl}?${qs.toString()}`;
};
