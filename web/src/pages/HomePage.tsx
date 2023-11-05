import React from "react";
import NavBar from "@components/NavBar";
import GlobalContext from "@src/context/GlobalContextProvider";
import HomePageButton from "@src/components/HomePageButtons";
import Footer from "@src/components/Footer";

/**
 * HomePage page displays the home page.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <HomePage />
 *
 * @returns {JSX.Element} Rendered page.
 */
export default function HomePage() {
  const { translate } = GlobalContext();
  return (
    <div className="flex w-full h-full flex-col">
      <NavBar />
      <div className="w-full h-full flex justify-center mt-20 mb-8">
        <div className="flex flex-row items-center justify-center md:justify-between w-10/12 px-5">
          <h1 className="text-4xl font-bold min-w-fit md:mr-10 text-center md:text-left">
            {translate("homepage", "page-title")}
          </h1>
          <div className="h-1 w-full bg-black hidden md:block" />
        </div>
      </div>
      <div className={"flex flex-col w-full items-center mb-10"}>
        <div className="flex flex-wrap flex-row w-full md:w-10/12 items-center justify-center lg:justify-start">
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
      <Footer />
    </div>
  );
}
