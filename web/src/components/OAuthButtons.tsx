import React from "react";
import AppContext from "@src/context/AppContextProvider";

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
      {oAuths.map((oauth) => (
        <button
          key={oauth.name}
          style={{ backgroundColor: oauth.color }}
          className={`justify-center items-center flex hover:bg-[#4e6aa3] text-white text-base font-bold w-1/6 px-6 py-2 rounded mt-5 mb-10`}
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
        <div className="border-2 w-4/6 border-[#DBDBDB]"></div>
        <p className="text-center text-[#B7B7B7] w-4/5">
          {translate("login", "orConnectWith")}
        </p>
        <div className="border-2 w-4/6 border-[#DBDBDB]"></div>
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
