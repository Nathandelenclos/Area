import React from "react";
import AppContext from "context/AppContextProvider";

export default function AppletCreationInputName() {
  const { translate } = AppContext();
  return (
    <div className="bg-[#7A73E7] px-8 py-10 rounded-[20px]">
      <div className="flex justify-evenly items-center w-full">
        <input
          type="text"
          placeholder={translate("create-applets", "input-applet-placeholder")}
          className="border-0 bg-[#7A73E7] text-white text-[28px] focus:outline-none placeholder-[#FFFFFF99] font-semibold"
        />
      </div>
    </div>
  );
}
