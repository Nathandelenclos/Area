import React from "react";
import NavBar from "@components/NavBar";
import OptionListContainer from "@components/OptionListContainer";
import AppletCreationInputName from "@components/AppletCreationInputName";
import AppContext from "context/AppContextProvider";
import { IconName } from "@fortawesome/fontawesome-svg-core";

type AppletServiceStruct = {
  id: number;
  title: string;
  logo?: IconName;
};

export default function CreateApplet() {
  const { translate } = AppContext();

  const appletServiceList: AppletServiceStruct[] = [
    { id: 1, title: "Nom du truc", logo: "apple" },
    {
      id: 2,
      title: "Nom du bazard",
      logo: "spotify",
    },
  ];
  const appletTriggerList: AppletServiceStruct[] = [
    { id: 1, title: "Nom du truc azd" },
    { id: 2, title: "Nom du bazard" },
    { id: 3, title: "Nom du bazard" },
    { id: 4, title: "Nom du bazard" },
    { id: 5, title: "Nom du bazard" },
    { id: 6, title: "Nom du bazard" },
    { id: 7, title: "Nom du bazard" },
  ];
  return (
    <div className="w-full h-full flex flex-col items-center">
      <NavBar />
      <div className="flex w-5/6 justify-between my-10 overflow-hidden">
        <OptionListContainer
          ContainerTitle={translate("create-applets", "applet-name-trigger")}
          inputField={<AppletCreationInputName />}
        />
        <OptionListContainer
          ContainerTitle={translate(
            "create-applets",
            "supported-services-trigger",
          )}
          childrens={appletServiceList}
        />
        <OptionListContainer
          ContainerTitle={translate("create-applets", "triggers-for-service")}
          childrens={appletTriggerList}
        />
      </div>
      <div className="bg-black text-white font-bold px-20 py-2 rounded-[20px] text-[28px] my-8">
        <p>Suivant</p>
      </div>
    </div>
  );
}
