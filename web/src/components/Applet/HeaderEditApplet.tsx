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

export type HeaderEditAppletProps = {
  applet: AppletObject;
};

type ActionIcon = {
  id: number;
  icon: IconDefinition;
  onPress: () => void;
};

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
