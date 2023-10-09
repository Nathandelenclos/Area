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
      <p className="text-[40px] font-extrabold">{appName}</p>
      <div className="h-100 flex items-center flex-row">
        <div className="h-100 flex items-center flex-row px-10">
          {(elements || defaultRoutes).map((element) => (
            <p
              className="font-semibold px-5 text-[32px] cursor-pointer"
              key={element.name}
              onClick={() => {
                navigate(element.RouteName);
              }}
            >
              {element.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
