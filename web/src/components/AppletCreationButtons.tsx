import React from "react";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AppletCreationButtonsProps = {
  ContainerTitle: string;
  Icon?: IconName;
  IsClicked: boolean;
  SetIsClicked: (id: number) => void;
  Id: number;
};

export default function AppletCreationButtons({
  ContainerTitle,
  Icon,
  IsClicked,
  SetIsClicked,
  Id,
}: AppletCreationButtonsProps) {
  return (
    <div
      className={`px-8 py-10 rounded-[20px] mb-5 ${
        IsClicked ? "bg-[#38356C]" : "bg-[#7A73E7] hover:bg-[#7A73E7CC]"
      } cursor-pointer`}
      onClick={() => {
        SetIsClicked(Id);
      }}
    >
      <div className="flex justify-evenly items-center w-full">
        {Icon ? (
          <FontAwesomeIcon icon={["fab", Icon]} size="2x" color="white" />
        ) : (
          <></>
        )}
        <h1 className="text-[27px] text-white font-semibold break-all w-4/6">
          {ContainerTitle}
        </h1>
      </div>
    </div>
  );
}
