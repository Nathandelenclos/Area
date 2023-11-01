import LoadingElement from "@src/components/LoadingElement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function getAccessTokenFromURL() {
  const urlParams = new URLSearchParams(window.location.href.substring(1));
  console.log(urlParams);
  const accessToken = urlParams.get("access_token");
  return accessToken;
}

// Example usage:
const accessToken = getAccessTokenFromURL();
console.log("Access Token:", accessToken);

export const LoginUserFacebook = () => {
  const navigate = useNavigate();

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
