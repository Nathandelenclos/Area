import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppContext from "@src/context/AppContextProvider";
import React from "react";

export default function ProfileMainInfo() {
  const { translate } = AppContext();
  return (
    <div
      className={
        "flex flex-col w-full h-auto items-center break-all md:break-normal"
      }
    >
      <div
        className={
          "flex flex-col w-10/12 md:flex-row lg:w-5/12 md:mx-10 h-auto items-center"
        }
      >
        <div className="flex flex-1 bg-[#7A73E7] justify-center md:mr-10 mr-0 rounded-[20px] py-10 px-10">
          <FontAwesomeIcon icon={"circle-user"} size="10x" color="white" />
        </div>
        <div className="flex flex-1 text-center flex-col h-auto space-y-5 md:text-left">
          <p className="text-[30px] font-semibold">Simon Riembault</p>
          <p className="text-[30px] md:break-normal break-all">
            simon.riembault@epitech.eu
          </p>
          <div className="min-w-fit h-auto bg-black hover:bg-[#000000CC] rounded-[20px] py-4 px-8 flex flex-row hover:cursor-pointer items-center justify-center">
            <p className="text-white font-bold mr-1 text-3xl">
              {translate("profile", "modify-password")}
            </p>
            <FontAwesomeIcon icon={"arrow-right"} size="2x" color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}
