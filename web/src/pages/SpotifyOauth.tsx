import LoadingElement from "@src/components/LoadingElement";
import { useNavigate } from "react-router-dom";
import { ApiInvoke } from "@services/api/api.invoke";
import { useEffect } from "react";

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

async function getUserInfo() {
  const access_token = getTokenFromUrl();
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token.access_token}`,
    },
  });
  const data = await result.json();
  console.log(data);
  return {
    email: data.email,
    providerId: data.id,
    refreshToken: access_token.access_token,
  };
}

export const LoginUserSpotify = () => {
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
      localStorage.setItem("accessToken", data.refreshToken);
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
