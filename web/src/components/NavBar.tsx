import React from "react";
import AppContext from "context/AppContextProvider";
import { RouteNames } from "@src/routes";
import { navigate } from "@src/utils";

export type NavBarElement = {
  name: string;
  RouteName: RouteNames;
};

export type NavBarProps = {
  elements?: NavBarElement[];
};

function NavBar({ elements }: NavBarProps) {
  const { translate, appName } = AppContext();
  const defaultRoutes: NavBarElement[] = [
    {
      name: translate("nav", "home"),
      RouteName: "home",
    },
    {
      name: translate("nav", "create"),
      RouteName: "create-applet",
    },
    {
      name: translate("nav", "applets"),
      RouteName: "applets",
    },
  ];
  return (
    <div className="w-full h-fit drop-shadow bg-white flex justify-between px-10 py-5 align-center">
      <p
        className="text-[40px] font-extrabold cursor-pointer"
        onClick={() => {
          window.location.href = "/home-page";
        }}
      >
        {appName}
      </p>
      <div className="h-100 flex items-center flex-row">
        <div className="h-100 flex items-center flex-row px-10">
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              window.location.href = "/home-page";
            }}
          >
            {translate("nav", "home")}
          </p>
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              window.location.href = "/create-applet-trigger";
            }}
          >
            {translate("nav", "create")}
          </p>
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              window.location.href = "/my-applets";
            }}
          >
            {translate("nav", "applets")}
          </p>
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              window.location.href = "/profile";
            }}
          >
            {translate("nav", "profile")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
