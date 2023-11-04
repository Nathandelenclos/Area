import LoadingElement from "@src/components/LoadingElement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Get the authorization code from the URL.
 *
 * @returns {string} Authorization code.
 */
function getAuthorizationCodeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");
  return authorizationCode;
}

/**
 * LoginUserGithub page takes care of sending the user on the right page when logging in with github.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <LoginUserGithub />
 *
 * @returns {JSX.Element} Rendered page.
 */
export const LoginUserGithub = () => {
  const navigate = useNavigate();

  /**
   * Get the authorization code from the url.
   * Send the authorization code to the backend.
   * If the authorization code is valid, redirect the user to the home page.
   */
  useEffect(() => {
    console.log(getAuthorizationCodeFromURL());

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
