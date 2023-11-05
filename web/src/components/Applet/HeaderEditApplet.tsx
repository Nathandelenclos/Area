import React from "react";
import {
  faClone,
  faPause,
  faPenToSquare,
  faStar,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { AppletObject } from "@src/objects/AppletObject";
import AppletService from "@services/AppletService";
import GlobalContext from "@src/context/GlobalContextProvider";

/**
 * Props for the HeaderEditApplet component.
 * @interface HeaderEditAppletProps
 */
export type HeaderEditAppletProps = {
  applet: AppletObject;
  actions?: ActionIcon[];
};

/**
 * Represents an action icon with its associated ID, FontAwesome icon, and onPress function.
 * @interface ActionIcon
 */
export type ActionIcon = {
  /**
   * The definition of the FontAwesome icon to be displayed.
   */
  icon: IconDefinition;
  /**
   * Function to be executed when the action icon is clicked.
   */
  onPress: () => void;
};

/**
 * HeaderEditApplet is a component that displays the header of an editable applet.
 *
 * @component
 * @example
 * // Example usage of HeaderEditApplet component
 * <HeaderEditApplet applet={appletData} />
 *
 * @param {HeaderEditAppletProps} props - The props for the HeaderEditApplet component.
 * @returns {JSX.Element} - Returns the rendered HeaderEditApplet component.
 */
export default function HeaderEditApplet({
  applet,
  actions,
}: HeaderEditAppletProps): JSX.Element {
  return (
    <div
      className="w-full h-1/6 flex flex-row items-center justify-between px-5"
      style={{ backgroundColor: "#7A73E7" }}
    >
      <p className="text-white text-3xl font-bold p-3">{applet.name}</p>
      <div className="min-w-fit">
        {actions &&
          actions.map((icon, index) => (
            <FontAwesomeIcon
              icon={icon.icon}
              size={"xl"}
              color={"white"}
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => icon.onPress()}
              key={index}
            />
          ))}
      </div>
    </div>
  );
}
