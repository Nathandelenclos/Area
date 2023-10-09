import React from "react";
import NavBar from "@components/NavBar";
import AppContext from "@src/context/AppContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
  const { translate } = AppContext();
  return (
    <div className="h-full w-full">
      <NavBar />
      <div className="w-full flex justify-center mt-20 mb-10">
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
      </div>
      <div className={"flex flex-col w-full h-full items-center"}>
        <div className={"flex flex-col w-5/12 h-full items-center"}>
          <FontAwesomeIcon icon={"circle-user"} size="10x" color="black" />
          <p>Simon Riembault</p>
          <p>simon.riembault@epitech.eu</p>
          <div className="h-[1px] w-full bg-black" />
        </div>
      </div>
    </div>
  );
}
