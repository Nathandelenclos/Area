import AppContext from "@src/context/AppContextProvider";
import React from "react";

export default function TopBarTitleSmaller() {
  const { translate } = AppContext();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold my-5">
        {translate("profile", "title")}
      </h1>
      <div className="bg-black hover:bg-[#000000CC] rounded-lg py-2 px-8 flex flex-row hover:cursor-pointer">
        <p className="text-white font-bold mr-1 text-3xl">
          {translate("profile", "logout-button")}
        </p>
      </div>
    </div>
  );
}
