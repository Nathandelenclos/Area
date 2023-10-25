import React from "react";
import AppContext from "context/AppContextProvider";
import { RouteNames } from "@src/routes";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

export type NavBarElement = {
  name: string;
  RouteName: RouteNames;
};

export type NavBarProps = {
  elements?: NavBarElement[];
};

function NavBar({ elements }: NavBarProps) {
  const { translate, appName } = AppContext();
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="block md:hidden">
        <Menu right>
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              navigate("/home-page");
            }}
          >
            {translate("nav", "home")}
          </p>
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              navigate("/create-applet");
            }}
          >
            {translate("nav", "create")}
          </p>
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              navigate("/my-applets");
            }}
          >
            {translate("nav", "applets")}
          </p>
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              navigate("/profile");
            }}
          >
            {translate("nav", "profile")}
          </p>
        </Menu>
      </div>
      <div className="w-full h-fit drop-shadow bg-white flex justify-between px-10 py-5 align-center">
        <p
          className="text-[40px] font-extrabold cursor-pointer text-white md:text-black"
          onClick={() => {
            navigate("/home-page");
          }}
        >
          {appName}
        </p>
        <div className="h-100 hidden items-center flex-row px-10 md:flex">
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              navigate("/home-page");
            }}
          >
            {translate("nav", "home")}
          </p>
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              navigate("/create-applet");
            }}
          >
            {translate("nav", "create")}
          </p>
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              navigate("/my-applets");
            }}
          >
            {translate("nav", "applets")}
          </p>
          <p
            className="font-semibold px-5 text-[32px] cursor-pointer"
            onClick={() => {
              navigate("/profile");
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
