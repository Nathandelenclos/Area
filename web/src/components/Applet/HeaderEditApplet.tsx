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

/**
 * Props for the HeaderEditApplet component.
 * @interface HeaderEditAppletProps
 */
export type HeaderEditAppletProps = {
  /**
   * The applet object containing information to be displayed in the header.
   */
  applet: AppletObject;
};

/**
 * Represents an action icon with its associated ID, FontAwesome icon, and onPress function.
 * @interface ActionIcon
 */
type ActionIcon = {
  /**
   * Unique identifier for the action icon.
   */
  id: number;
  /**
   * FontAwesome icon definition.
   */
  icon: IconDefinition;
  /**
   * Function to be executed when the action icon is clicked.
   */
  onPress: () => void;
};

/**
 * Array of action icons to be displayed in the header.
 * @constant
 * @type {ActionIcon[]}
 */
const actionIcons: ActionIcon[] = [
  {
    id: 1,
    icon: faPause,
    onPress: () => console.log("Pause"),
  },
  {
    id: 2,
    icon: faPenToSquare,
    onPress: () => console.log("Edit"),
  },
  {
    id: 3,
    icon: faStar,
    onPress: () => console.log("Favorite"),
  },
  {
    id: 4,
    icon: faClone,
    onPress: () => console.log("Clone"),
  },
  {
    id: 5,
    icon: faTrashCan,
    onPress: () => console.log("Delete"),
  },
];

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
export default function HeaderEditApplet({ applet }: HeaderEditAppletProps) {
  return (
    <div
      className="w-full h-1/6 flex flex-row items-center justify-between px-5"
      style={{ backgroundColor: "#7A73E7" }}
    >
      <p className="text-white text-3xl font-bold p-3">{applet.name}</p>
      <div className="min-w-fit">
        {actionIcons.map((icon) => (
          <FontAwesomeIcon
            icon={icon.icon}
            size={"xl"}
            color={"white"}
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={icon.onPress}
            key={icon.id}
          />
        ))}
      </div>
    </div>
  );
}
