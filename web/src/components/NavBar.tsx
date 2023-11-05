import GlobalContext from "@src/context/GlobalContextProvider";
import { useNavigate } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import { useState } from "react";
import { Language } from "@src/lang";

/**
 * Type of the languages.
 * @interface listType
 */
export type listType = {
  /**
   * The language of the choice.
   */
  lang: string;
  /**
   * The value of the choice.
   */
  value: string;
};

/**
 * List of every language available.
 */
const choices: listType[] = [
  { lang: "Français", value: "fr" },
  { lang: "English", value: "en" },
  { lang: "Espanol", value: "es" },
];

/**
 * NavBar component displays the navigation bar of the application.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <NavBar />
 *
 * @returns {JSX.Element} Rendered component.
 */
function NavBar() {
  const { translate, appName, setLanguage, language } = GlobalContext();
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(language.toString());

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
            onChange={(e) => {
              setSelectedValue(e.target.value);
              setLanguage(selectedValue as Language);
            }}
            className="border text-[12px] py-2 px-3 ml-2 rounded-[10px] text-black"
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
          className="text-[35px] font-extrabold cursor-pointer text-white sm:text-black hover:text-[#000000CC]"
          onClick={() => {
            navigate("/home-page");
          }}
        >
          {appName}
        </p>
        <div className="h-100 hidden items-center flex-row px-10 md:flex">
          <p
            className="font-semibold px-5 text-[30px] cursor-pointer hover:text-[#000000CC]"
            onClick={() => {
              navigate("/home-page");
            }}
          >
            {translate("nav", "home")}
          </p>
          <p
            className="font-semibold px-5 text-[30px] cursor-pointer hover:text-[#000000CC]"
            onClick={() => {
              navigate("/create-applet");
            }}
          >
            {translate("nav", "create")}
          </p>
          <p
            className="font-semibold px-5 text-[30px] cursor-pointer hover:text-[#000000CC]"
            onClick={() => {
              navigate("/my-applets");
            }}
          >
            {translate("nav", "applets")}
          </p>
          <p
            className="font-semibold px-5 text-[30px] cursor-pointer hover:text-[#000000CC]"
            onClick={() => {
              navigate("/profile");
            }}
          >
            {translate("nav", "profile")}
          </p>
          <select
            value={selectedValue}
            onChange={(e) => {
              setSelectedValue(e.target.value);
              setLanguage(e.target.value as Language);
            }}
            className="border text-[12px] py-2 px-3 ml-2 rounded-[10px] text-black"
          >
            {choices.map((choice, index: number) => (
              <option key={index} value={choice.value}>
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
