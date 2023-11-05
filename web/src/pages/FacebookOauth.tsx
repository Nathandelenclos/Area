import { ApiInvoke } from "@services/api/api.invoke";
import LoadingElement from "@src/components/LoadingElement";
import GlobalContext from "@src/context/GlobalContextProvider";
import { UserObject } from "@src/objects/UserObject";
import { AuthServices } from "@src/services/AuthServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

async function getAccessTokenFromURL() {
  const url = window.location.href;
  const index = url.split("?")[1].substring(1);
  let tab = index.split("&");
  tab = tab.map((element) => {
    const tab2 = element.split("=");
    return tab2[1];
  });
  const accessToken = tab[0];

  const clientId = process.env.REACT_APP_FACEBOOK_OAUTH_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_FACEBOOK_OAUTH_CLIENT_SECRET;

  const refreshTokenQuery: Response = await fetch(
    `https://graph.facebook.com/v18.0/oauth/access_token?
  grant_type=fb_exchange_token&
  client_id=${clientId}&
  client_secret=${clientSecret}&
  fb_exchange_token=${accessToken}`,
  );

  const refreshData = await refreshTokenQuery.json();
  const refreshToken = refreshData.access_token;

  const response: Response = await fetch(
    `https://graph.facebook.com/me?access_token=${refreshToken}&fields=email`,
  );
  const data = await response.json();
  return {
    email: data.email,
    providerId: data.id,
    refreshToken: refreshToken,
  };
}

export const LoginUserFacebook = () => {
  const { setUser } = GlobalContext();
  const navigate = useNavigate();

  async function tryLogin() {
    const data = await getAccessTokenFromURL();
    if (!data) {
      navigate("/");
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
    //todo: LINK AUTH WITH BACK-END
    if (resp.status === 200) {
      setUser(new UserObject(resp.data));
      localStorage.setItem("accessToken", resp.data.token);
      const token = resp.data.token;
      const data = await AuthServices.me(token);
      console.log(data);
      if (data.status === 200) {
        setUser(
          new UserObject({
            email: data.data.email,
            name: data.data.name,
            token,
            oauth: data.data.oauth,
          }),
        );
      }
      navigate("/home-page");
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoadingElement />
    </div>
  );
};
