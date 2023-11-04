/**
 * Returns the Spotify login URL
 * @returns {string} The Spotify login URL
 */
export const getSpotifyUrl = () => {
  const authEndpoint = "https://accounts.spotify.com/authorize";

  const redirectUrl = "http://localhost:3000/api/sessions/oauth/spotify";

  const clientId = encodeURIComponent("50aa0bf1af60431a806873db0442b6a9");

  const scopes = [
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-email",
    "user-read-private",
  ];

  const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scopes=${scopes.join(
    "%20",
  )}&response_type=token&show_dialog=true`;

  return loginUrl;
};
