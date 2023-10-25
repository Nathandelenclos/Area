import React, { useState } from "react";
import AppContext from "context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

export type listType = {
  lang: string;
};

const choices: listType[] = [
  { lang: "Francais" },
  { lang: "English" },
  { lang: "Espanol" },
];

function NavBar() {
  const { translate, appName } = AppContext();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("Francais");

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
          <select
            value={selectedValue}
            className="border py-2 px-5 ml-2 rounded-[10px] text-black"
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            {choices.map((choice, index: number) => (
              <option key={index} value={choice.lang}>
                {choice.lang}
              </option>
            ))}
          </select>
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
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="border py-2 px-5 ml-2 rounded-[10px] text-black"
          >
            {choices.map((choice, index: number) => (
              <option key={index} value={choice.lang}>
                {choice.lang}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
