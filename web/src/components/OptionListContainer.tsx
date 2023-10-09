import React from "react";
import AppletCreationButtons from "./AppletCreationButtons";
import { IconName } from "@fortawesome/fontawesome-svg-core";

type AppletServiceStruct = {
  id: number;
  title: string;
  logo?: IconName;
  isClicked: boolean;
};

type OptionListContainerProps = {
  ContainerTitle: string;
  childrens?: AppletServiceStruct[];
  inputField?: React.ReactNode;
  handleStateChange?: (id: number) => void;
};

function AppletList({
  childs,
  handleStateChange,
}: {
  childs: AppletServiceStruct[];
  handleStateChange?: (id: number) => void;
}) {
  const handleClick = (id: number) => {
    if (handleStateChange) {
      handleStateChange(id);
    }
  };
  return (
    <div>
      {childs.map((child) =>
        child.logo ? (
          <AppletCreationButtons
            ContainerTitle={child.title}
            Icon={child.logo}
            IsClicked={child.isClicked}
            SetIsClicked={handleClick}
            Id={child.id}
          />
        ) : (
          <AppletCreationButtons
            IsClicked={child.isClicked}
            SetIsClicked={handleClick}
            ContainerTitle={child.title}
            Id={child.id}
          />
        ),
      )}
    </div>
  );
}

export default function OptionListContainer({
  ContainerTitle,
  childrens,
  inputField,
  handleStateChange,
}: OptionListContainerProps) {
  return (
    <div className="w-full mx-10 flex flex-col">
      <h1 className="font-bold text-[30px] text-center my-10">
        {ContainerTitle}
      </h1>
      <div className="overflow-y-scroll">
        {inputField ? (
          inputField
        ) : (
          <AppletList
            childs={childrens ?? []}
            handleStateChange={handleStateChange}
          />
        )}
      </div>
    </div>
  );
}
