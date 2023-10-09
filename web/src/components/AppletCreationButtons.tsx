import React from "react";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AppletCreationButtonsProps = {
  title: string;
  icon?: IconName;
  isSelected: boolean;
  onClick: (id: number) => void;
  id: number;
};

export default function AppletCreationButtons({
  title,
  icon,
  isSelected,
  onClick,
  id,
}: AppletCreationButtonsProps) {
  return (
    <div
      className={`px-8 py-10 rounded-[20px] mb-5 ${
        isSelected ? "bg-[#38356C]" : "bg-[#7A73E7] hover:bg-[#7A73E7CC]"
      } cursor-pointer`}
      onClick={() => onClick(id)}
    >
      <div className="flex justify-evenly items-center w-full">
        {icon ? (
          <FontAwesomeIcon icon={["fab", icon]} size="2x" color="white" />
        ) : (
          <></>
        )}
        <h1 className="text-[27px] text-white font-semibold break-all w-4/6">
          {title}
        </h1>
      </div>
    </div>
  );
}
