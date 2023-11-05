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

export type ActionIcon = {
  icon: IconDefinition;
  onPress: () => void;
};

export type HeaderEditAppletProps = {
  applet: AppletObject;
  actions?: ActionIcon[];
};

export default function HeaderEditApplet({
  applet,
  actions,
}: HeaderEditAppletProps) {
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
