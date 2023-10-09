import React from "react";
import AppletCreationButtons from "./AppletCreationButtons";
import { IconName } from "@fortawesome/fontawesome-svg-core";

type AppletServiceStruct = {
  id: number;
  title: string;
  logo?: IconName;
};

type OptionListContainerProps = {
  ContainerTitle: string;
  childrens?: AppletServiceStruct[];
  inputField?: React.ReactNode;
};

function AppletList({ childs }: { childs: AppletServiceStruct[] }) {
  return (
    <div>
      {childs.map((child) =>
        child.logo ? (
          <AppletCreationButtons
            ContainerTitle={child.title}
            Icon={child.logo}
          />
        ) : (
          <AppletCreationButtons ContainerTitle={child.title} />
        ),
      )}
    </div>
  );
}

export default function OptionListContainer({
  ContainerTitle,
  childrens,
  inputField,
}: OptionListContainerProps) {
  return (
    <div className="w-full mx-10 flex flex-col">
      <h1 className="font-bold text-[30px] text-center my-10">
        {ContainerTitle}
      </h1>
      <div className="overflow-y-scroll">
        {inputField ? inputField : <AppletList childs={childrens ?? []} />}
      </div>
    </div>
  );
}
