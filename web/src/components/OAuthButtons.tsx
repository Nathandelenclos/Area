import React from "react";
import AppContext from "@src/context/AppContextProvider";
import { getGoogleUrl } from "@src/utils/getGoogleUrl";
import { getSpotifyUrl } from "@src/utils/getSpotifyUrl";

function OAuthList() {
  type OAuth = {
    name: string;
    shortName: string;
    color: string;
    redirect: string;
  };

  const oAuths: OAuth[] = [
    {
      name: "Facebook",
      shortName: "F",
      color: "#3B5998",
      redirect: "/",
    },
    {
      name: "Google",
      shortName: "G",
      color: "#DB4437",
      redirect: getGoogleUrl("/home-page"),
    },
    {
      name: "Twitter",
      shortName: "T",
      color: "#00ACEE",
      redirect: "/",
    },
    {
      name: "Spotify",
      shortName: "S",
      color: "#1ED760",
      redirect: getSpotifyUrl(),
    },
  ];

  return (
    <div className="w-full justify-evenly items-center flex flex-row mt-5">
      {oAuths.map((oauth) => (
        <a
          key={oauth.name}
          className="justify-center items-center flex hover:opacity-70 text-white text-base font-bold w-1/6 px-6 py-2 rounded mt-5 mb-10"
          style={{ backgroundColor: oauth.color }}
          href={oauth.redirect}
        >
          {oauth.shortName}
        </a>
      ))}
    </div>
  );
}

function ConnectionsOptionsSeparator() {
  const { translate } = AppContext();
  return (
    <div className="w-full justify-center items-center flex">
      <div className="flex flex-row justify-center items-center w-10/12">
        <div className="border-2 w-full border-[#DBDBDB]"></div>
        <p className="text-center min-w-max mx-2 text-[#B7B7B7]">
          {translate("login", "orConnectWith")}
        </p>
        <div className="border-2 w-full border-[#DBDBDB]"></div>
      </div>
    </div>
  );
}

export default function OAuthButtons() {
  return (
    <>
      <ConnectionsOptionsSeparator />
      <OAuthList />
    </>
  );
}
