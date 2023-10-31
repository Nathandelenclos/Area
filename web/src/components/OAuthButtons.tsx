import React from "react";
import AppContext from "@src/context/AppContextProvider";
import { getGoogleUrl } from "@src/utils/getGoogleUrl";

function OAuthList() {
  type OAuth = {
    name: string;
    shortName: string;
    color: string;
  };

  const oAuths: OAuth[] = [
    {
      name: "Facebook",
      shortName: "F",
      color: "#3B5998",
    },
    {
      name: "Google",
      shortName: "G",
      color: "#DB4437",
    },
    {
      name: "Twitter",
      shortName: "T",
      color: "#00ACEE",
    },
  ];

  return (
    <div className="w-full justify-evenly items-center flex flex-row mt-5">
      <a href={getGoogleUrl("/profile")}>
        <img
          className="pr-2"
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
          }
          alt=""
          style={{ height: "2rem" }}
        />
        Continue with Google
      </a>
      {oAuths.map((oauth) => (
        <button
          key={oauth.name}
          className="justify-center items-center flex hover:bg-[#4e6aa3] text-white text-base font-bold w-1/6 px-6 py-2 rounded mt-5 mb-10"
          style={{ backgroundColor: oauth.color }}
        >
          {oauth.shortName}
        </button>
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
