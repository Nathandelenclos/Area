import React from "react";
import AppContext from "context/AppContextProvider";

interface AppletCreationInputNameProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AppletCreationInputName({
  value,
  onChange,
}: AppletCreationInputNameProps) {
  const { translate } = AppContext();
  return (
    <div className="bg-[#7A73E7] px-8 py-10 rounded-[20px] h-max">
      <div className="flex justify-evenly items-center w-full">
        <input
          type="text"
          placeholder={translate("create-applets", "input-applet-placeholder")}
          className="border-0 bg-[#7A73E7] text-white text-[28px] focus:outline-none placeholder-[#FFFFFF99] font-semibold"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}
