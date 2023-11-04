import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AppContext from "@src/context/AppContextProvider";

/**
 * Props for the HeaderMyApplet component.
 * @type HeaderMyAppletProps
 */
export type HeaderMyAppletProps = {
  /**
   * Function to handle create applet action.
   */
  CreateApplet: () => void;
};

/**
 * HeaderMyApplet component displays the header for the MyApplet section.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <HeaderMyApplet CreateApplet={() => {navigate("/create-applet")}} />
 *
 * @param {HeaderMyAppletProps} props - The properties of the component.
 * @returns {JSX.Element} Rendered component.
 */
export default function HeaderMyApplet({ CreateApplet }: HeaderMyAppletProps) {
  const { translate } = AppContext();
  return (
    <div className="w-full flex justify-center mt-5">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full md:w-10/12 px-5">
        <h1 className="text-3xl font-bold min-w-fit sm:mr-10 text-center">
          {translate("applets", "title")}
        </h1>
        <div className="h-1 w-full bg-black hidden sm:block" />
        <div
          className="min-w-fit my-5 sm:my-0 sm:ml-10 bg-black rounded-lg p-2 flex flex-row hover:cursor-pointer items-center justify-center"
          onClick={CreateApplet}
        >
          <p className="text-white font-bold mr-2 text-3xl">
            {translate("applets", "create")}
          </p>
          <FontAwesomeIcon icon={faCirclePlus} size={"lg"} color={"white"} />
        </div>
      </div>
    </div>
  );
}
