import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AppContext from "@src/context/AppContextProvider";

export type HeaderMyAppletProps = {
  CreateApplet: () => void;
};

export default function HeaderMyApplet({ CreateApplet }: HeaderMyAppletProps) {
  const { translate } = AppContext();
  return (
    <div className="w-full flex justify-center mt-5">
      <div className="flex flex-row items-center justify-between w-10/12 px-5">
        <h1 className="text-3xl font-bold min-w-fit mr-10">
          {translate("applets", "title")}
        </h1>
        <div className="h-1 w-full bg-black" />
        <div
          className="min-w-fit ml-10 bg-black rounded-lg p-2 flex flex-row hover:cursor-pointer items-center justify-center"
          onClick={CreateApplet}
        >
          <p className="text-white font-bold mr-2 text-3xl">
            {translate("applets", "create")}
          </p>
          <FontAwesomeIcon icon={faCirclePlus} size={"lg"} color={"white"} />
        </div>
      </div>
    </div>
  );
}
