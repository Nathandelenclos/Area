import AppContext from "@src/context/AppContextProvider";
import React from "react";

export default function TopBarTitle() {
  const { translate } = AppContext();
  return (
    <div className="flex flex-row items-center justify-between w-10/12 px-5">
      <h1 className="text-4xl font-bold min-w-fit mr-10">
        {translate("profile", "title")}
      </h1>
      <div className="h-1 w-full bg-black" />
      <div className="min-w-fit ml-10 bg-black hover:bg-[#000000CC] rounded-lg py-2 px-8 flex flex-row hover:cursor-pointer items-center justify-center">
        <p className="text-white font-bold mr-1 text-3xl">
          {translate("profile", "logout-button")}
        </p>
      </div>
    </div>
  );
}
