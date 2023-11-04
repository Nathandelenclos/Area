import LoadingElement from "@src/components/LoadingElement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Get the authorization code from the URL.
 *
 * @returns {string} Authorization code.
 */
export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial: any, item) => {
      const parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

/**
 * LoginUserSpotify page takes care of sending the user on the right page when logging in with spotify.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <LoginUserSpotify />
 *
 * @returns {JSX.Element} Rendered page.
 */
export const LoginUserSpotify = () => {
  const navigate = useNavigate();

  /**
   * Get the authorization code from the url.
   * Send the authorization code to the backend.
   * If the authorization code is valid, redirect the user to the home page.
   */
  useEffect(() => {
    console.log(getTokenFromUrl());

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
