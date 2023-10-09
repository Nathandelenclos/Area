import React from "react";
import NavBar from "@components/NavBar";
import AppContext from "@src/context/AppContextProvider";
import HomePageButton from "@src/components/HomePageButtons";

export default function HomePage() {
  const { translate } = AppContext();
  return (
    <div className="h-full w-full">
      <NavBar />
      <div className="w-full flex justify-center mt-20 mb-8">
        <div className="flex flex-row items-center justify-between w-10/12 px-5">
          <h1 className="text-4xl font-bold min-w-fit mr-10">
            {translate("homepage", "page-title")}
          </h1>
          <div className="h-1 w-full bg-black" />
        </div>
      </div>
      <div className={"flex flex-col w-full h-full items-center"}>
        <div className="flex flex-wrap flex-row w-10/12">
          <HomePageButton Content={"Suggestion #1"} />
          <HomePageButton Content={"Suggestion #2"} />
          <HomePageButton Content={"Suggestion #3"} />
          <HomePageButton Content={"Suggestion #4"} />
          <HomePageButton Content={"Suggestion #5"} />
          <HomePageButton Content={"Suggestion #6"} />
          <HomePageButton Content={"Suggestion #7"} />
          <HomePageButton Content={"Suggestion #8"} />
        </div>
      </div>
    </div>
  );
}
