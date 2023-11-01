export const getSpotifyUrl = () => {
  const authEndpoint = "https://accounts.spotify.com/authorize";

  const redirectUrl = "http://localhost:3000/api/sessions/oauth/spotify";

  const clientId = encodeURIComponent("<MY_CLIENT_ID>");

  const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
  ];

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scopes=${scopes.join(
    "%20",
  )}&response_type=token&show_dialog=true`;

  return loginUrl;
};
