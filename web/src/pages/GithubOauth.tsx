import LoadingElement from "@src/components/LoadingElement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function getAuthorizationCodeFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const authorizationCode = urlParams.get("code");
  return authorizationCode;
}

export const LoginUserGithub = () => {
  const navigate = useNavigate();

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
