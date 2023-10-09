import React, { useState } from "react";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type AppletCreationButtonsProps = {
  ContainerTitle: string;
  Icon?: IconName;
};

export default function AppletCreationButtons({
  ContainerTitle,
  Icon,
}: AppletCreationButtonsProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleDivClick = () => {
    setIsClicked(!isClicked);
    console.log("Clicked on " + ContainerTitle);
  };

  return (
    <div
      className={`px-8 py-10 rounded-[20px] mb-5 ${
        isClicked ? "bg-[#38356C]" : "bg-[#7A73E7]"
      }`}
      onClick={handleDivClick}
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
