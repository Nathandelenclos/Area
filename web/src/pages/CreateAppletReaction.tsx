import React, { useState } from "react";
import NavBar from "@components/NavBar";
import OptionListContainer from "@components/OptionListContainer";
import AppContext from "context/AppContextProvider";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { navigate } from "@src/utils/navigate";

type AppletServiceStruct = {
  id: number;
  title: string;
  logo?: IconName;
  isClicked: boolean;
};

export default function CreateAppletReaction() {
  const { translate } = AppContext();

  const appletServiceList: AppletServiceStruct[] = [
    { id: 1, title: "Nom du truc", logo: "apple", isClicked: false },
    {
      id: 2,
      title: "Nom du bazard",
      logo: "spotify",
      isClicked: false,
    },
  ];
  const appletReactionList: AppletServiceStruct[] = [
    { id: 1, title: "Nom du truc azd", isClicked: false },
    { id: 2, title: "Nom du bazard", isClicked: false },
    { id: 3, title: "Nom du bazard", isClicked: false },
    { id: 4, title: "Nom du bazard", isClicked: false },
    { id: 5, title: "Nom du bazard", isClicked: false },
    { id: 6, title: "Nom du bazard", isClicked: false },
    { id: 7, title: "Nom du bazard", isClicked: false },
  ];
  const appletReactionNumberList: AppletServiceStruct[] = [
    { id: 1, title: "Reaction #1", isClicked: false },
  ];
  const [modifiableReactionList, modifyReactionList] =
    useState(appletReactionList);
  const [modifiableServiceList, modifyServiceList] =
    useState(appletServiceList);

  const handleStateChangeService = (id: number) => {
    const updatedServiceList = modifiableServiceList.map((e) => {
      if (e.id === id) {
        return { ...e, isClicked: true };
      } else {
        return { ...e, isClicked: false };
      }
    });

    modifyServiceList(updatedServiceList);
  };

  const handleStateChangeReaction = (id: number) => {
    const updatedTriggerList = modifiableReactionList.map((e) => {
      if (e.id === id) {
        return { ...e, isClicked: true };
      } else {
        return { ...e, isClicked: false };
      }
    });

    modifyReactionList(updatedTriggerList);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <NavBar />
      <div className="flex w-5/6 justify-between my-10 overflow-hidden">
        <OptionListContainer
          ContainerTitle={translate("create-applets", "reactions-number")}
          childrens={appletReactionNumberList}
        />
        <OptionListContainer
          ContainerTitle={translate(
            "create-applets",
            "supported-services-reaction",
          )}
          childrens={modifiableServiceList}
          handleStateChange={handleStateChangeService}
        />
        <OptionListContainer
          ContainerTitle={translate("create-applets", "reactions-for-service")}
          childrens={modifiableReactionList}
          handleStateChange={handleStateChangeReaction}
        />
      </div>
      <div
        className="bg-black text-white font-bold px-20 py-2 rounded-[20px] text-[28px] my-8 hover:bg-[#00000099] cursor-pointer"
        onClick={() => {
          navigate("create-applet-trigger");
        }}
      >
        <p>Terminé</p>
      </div>
    </div>
  );
}
