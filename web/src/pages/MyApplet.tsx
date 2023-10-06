import React from "react";
import NavBar from "@components/NavBar";

export default function MyApplet() {
  return (
    <div className="h-full w-full bg-red-400">
      <NavBar />
      <div className="w-full flex justify-center">
        <div className="flex flex-row items-center justify-between w-10/12 px-5">
          <h1 className="text-3xl font-bold min-w-fit mr-10">My Applets</h1>
          <div className="h-1 w-full bg-black" />
          <div className="min-w-fit ml-10 bg-black rounded-lg p-2 flex flex-row hover:cursor-pointer items-center justify-center">
            <p className="text-white font-bold mr-1 text-3xl">Create</p>
          </div>
        </div>
      </div>
      <div className={"flex-col bg-red-600"}>
        <p>Salut</p>
      </div>
    </div>
  );
}
