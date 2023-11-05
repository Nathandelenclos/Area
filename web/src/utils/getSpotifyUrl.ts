/**
 * Returns the Spotify login URL
 * @returns {string} The Spotify login URL
 */
export const getSpotifyUrl = () => {
  const authEndpoint = process.env.REACT_APP_SPOTIFY_OAUTH_AUTH_ENDPOINT;
  const redirectUrl = process.env.REACT_APP_SPOTIFY_OAUTH_REDIRECT_URI;
  const clientId = process.env.REACT_APP_SPOTIFY_OAUTH_CLIENT_ID;

  const scopes = [
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-email",
    "user-read-private",
  ];

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
    "%20",
  )}&response_type=code&show_dialog=true`;

  return loginUrl;
};
