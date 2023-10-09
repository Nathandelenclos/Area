import React from "react";
import NavBar from "@components/NavBar";
import AppContext from "@src/context/AppContextProvider";

export default function HomePage() {
  const { translate } = AppContext();
  return (
    <div className="h-full w-full bg-red-400">
      <NavBar />
      <div className="w-full flex justify-center mt-20">
        <div className="flex flex-row items-center justify-between w-10/12 px-5">
          <h1 className="text-4xl font-bold min-w-fit mr-10">
            {translate("applets", "title")}
          </h1>
          <div className="h-1 w-full bg-black" />
        </div>
      </div>
      <div className={"flex flex-col bg-red-600 w-full items-center"}>
        <div className="">
          <p></p>
        </div>
      </div>
    </div>
  );
}
