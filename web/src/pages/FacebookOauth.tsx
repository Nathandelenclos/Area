import LoadingElement from "@src/components/LoadingElement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Get the access token from the URL.
 *
 * @returns {string} Access token.
 */
function getAccessTokenFromURL() {
  const urlParams = new URLSearchParams(window.location.href.substring(1));
  console.log(urlParams);
  const accessToken = urlParams.get("access_token");
  return accessToken;
}

/**
 * LoginUserFacebook page takes care of sending the user on the right page when logging in with facebook.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <LoginUserFacebook />
 *
 * @returns {JSX.Element} Rendered page.
 */
export const LoginUserFacebook = () => {
  const navigate = useNavigate();

  /**
   * Get the token from the url.
   * Send the access token to the backend.
   * If the access token is valid, redirect the user to the home page.
   */
  useEffect(() => {
    console.log(getAccessTokenFromURL());
    setTimeout(() => {
      navigate("/home-page");
    }, 5000);
    //todo: send code to backend
    //todo: login if suceccess and redirect home else redirect to login page
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoadingElement />
    </div>
  );
};
