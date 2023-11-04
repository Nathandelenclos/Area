import LoadingElement from "@src/components/LoadingElement";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiInvoke } from "@services/api/api.invoke";

async function getAccessTokenFromURL() {
  const url = window.location.href;
  const index = url.split("?")[1].substring(1);
  let tab = index.split("&");
  tab = tab.map((element) => {
    const tab2 = element.split("=");
    return tab2[1];
  });
  const accessToken = tab[3];
  const response: Response = await fetch(
    `https://graph.facebook.com/me?access_token=${accessToken}&fields=email`,
  );
  const data = await response.json();
  return {
    email: data.email,
    id: data.id,
    token: accessToken,
  };
}

export const LoginUserFacebook = () => {
  const navigate = useNavigate();

  async function tryLogin() {
    const data = await getAccessTokenFromURL();
    if (!data) {
      navigate("/home");
      return;
    }
    const resp = await ApiInvoke({
      endpoint: "/auth/signoauth",
      method: "POST",
      expectedStatus: 200,
      body: JSON.stringify({
        ...data,
        provider: "facebook",
      }),
    });
    console.log(resp);
    //todo: LINK AUTH WITH BACK-END
    navigate("/home-page");
  }

  useEffect(() => {
    tryLogin();
    //todo: send code to backend
    //todo: login if suceccess and redirect home else redirect to login page
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoadingElement />
    </div>
  );
};
