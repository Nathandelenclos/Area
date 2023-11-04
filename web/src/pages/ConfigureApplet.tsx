import React from "react";
import NavBar from "@components/NavBar";
import AppContext from "@src/context/AppContextProvider";
import ConfigureAppletButton from "@src/components/ConfigureAppletButton";
import ConfigureAppletField from "@src/components/ConfigureInputField";
import ConfigureAppletDate from "@src/components/ConfigureInputDate";
import ConfigureAppletNumber from "@src/components/ConfigureInputNumber";

/**
 * ConfigureApplet page displays the configure applet page.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <ConfigureApplet />
 *
 * @returns {JSX.Element} Rendered page.
 */
export default function ConfigureApplet() {
  const { translate } = AppContext();
  return (
    <div className="w-full">
      <NavBar />
      <div className="w-full flex flex-col md:flex-row justify-around mt-20">
        <div className="flex flex-col text-center items-center">
          <p className="font-semibold text-[30px]">
            {translate("configure-applet", "trigger")}
          </p>
          <ConfigureAppletButton
            title="Se connecter à Spotify"
            connected={false}
            redirect={() => {
              console.log("Connect to spotify");
            }}
          />
          <ConfigureAppletNumber
            title="Delay in seconds"
            placeholderText="Delay in seconds"
            minimunNumber="0"
          />
          <ConfigureAppletDate title="Start date" />
        </div>
        <div className="flex flex-col text-center items-center mt-20 md:mt-0 mb-[150px] md:mb-0">
          <p className="font-semibold text-[30px]">
            {translate("configure-applet", "reaction")}
          </p>
          <ConfigureAppletButton title="Connecté à Youtube" connected={true} />
          <ConfigureAppletField
            title="Link to Youtube Channel"
            placeholderText="Channel link"
          />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full justify-center">
        <div
          className={`text-white font-bold px-10 py-4 rounded-[20px] text-[28px] my-8 bg-black hover:bg-[#00000099] cursor-pointer`}
        >
          <p className="w-full text-center">
            {translate("create-applets", "done")}
          </p>
        </div>
      </div>
    </div>
  );
}
