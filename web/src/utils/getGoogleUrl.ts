export const getGoogleUrl = (from: string) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const options = {
    redirect_uri: "http://localhost:3000/api/sessions/oauth/google",
    client_id:
      "485338230618-jg4n220ki98qa1c5psndcbea1vqpqrsi.apps.googleusercontent.com",
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
  console.log(qs);
  return `${rootUrl}?${qs.toString()}`;
};
