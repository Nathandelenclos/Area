import React from "react";
import AppContext from "context/AppContextProvider";

function NavBar() {
  const { translate, appName } = AppContext();
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
          <p className="font-semibold px-5 text-[32px]">
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
          <p className="font-semibold px-5 text-[32px]">
            {translate("nav", "applets")}
          </p>
          <p className="font-semibold px-5 text-[32px]">
            {translate("nav", "profile")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
