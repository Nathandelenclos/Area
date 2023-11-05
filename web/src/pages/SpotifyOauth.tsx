import { ApiInvoke } from "@services/api/api.invoke";
import LoadingElement from "@src/components/LoadingElement";
import GlobalContext from "@src/context/GlobalContextProvider";
import { UserObject } from "@src/objects/UserObject";
import { AuthServices } from "@src/services/AuthServices";
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

function getUserInfo() {
  const access_token = getTokenFromUrl();
  console.log(access_token);
  //   const result = await fetch("https://api.spotify.com/v1/me", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${access_token.access_token}`,
  //     },
  //   });
  //   const data = await result.json();
  return {
    email: "data.email",
    providerId: "data.id",
    refreshToken: "access_token.access_token",
  };
}

export const LoginUserSpotify = () => {
  const { setUser } = GlobalContext();
  const navigate = useNavigate();

  async function getAccessTokenFromURL() {
    const data = await getUserInfo();
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
        provider: "spotify",
      }),
    });
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
    getAccessTokenFromURL();
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoadingElement />
    </div>
  );
};
