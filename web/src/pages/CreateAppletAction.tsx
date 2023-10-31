import React, { useEffect, useState } from "react";
import NavBar from "@components/NavBar";
import OptionListContainer from "@components/OptionListContainer";
import AppletCreationInputName from "@components/AppletCreationInputName";
import AppContext from "context/AppContextProvider";
import AppletService from "@services/AppletService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AreaService from "@services/AreaService";
import { ServiceObject, ServiceObjectDto } from "@src/objects/ServiceObject";
import Footer from "@src/components/Footer";

export default function CreateAppletAction() {
  const { translate, user } = AppContext();
  const navigate = useNavigate();
  const [appletName, setAppletName] = useState<string>("");
  const [services, setServices] = useState<ServiceObject[]>([]);
  const [selectedServiceAction, setSelectedServiceAction] = useState<number>(0);
  const [selectedAction, setSelectedAction] = useState<number>(0);
  const [selectedServiceReaction, setSelectedServiceReaction] =
    useState<number>(0);
  const [selectedReaction, setSelectedReaction] = useState<number>(0);

  useEffect(() => {
    if (!user.getAccessToken()) return;
    getServices();
  }, [user]);

  const getServices = async () => {
    const response = await AreaService.getServices(user.getAccessToken());
    if (!response.data) return;

    const fetchedServices = response.data;
    const serviceObjects: ServiceObject[] = fetchedServices.map(
      (service: ServiceObjectDto) => new ServiceObject(service),
    );
    setServices(serviceObjects);
  };

  const onAppletCreation = async () => {
    if (
      appletName.length === 0 ||
      !selectedServiceAction ||
      !selectedAction ||
      !selectedServiceReaction ||
      !selectedReaction
    )
      return toast("Veuillez selectionner un objet dans chaque colonne", {
        type: "error",
      });

    const response = await AppletService.create(
      {
        name: appletName,
        description: "",
        is_active: true,
        action: selectedAction,
        reaction: selectedReaction,
        config: undefined,
      },
      user.getAccessToken(),
    );
    if (!response.data)
      return toast("Error while creating applet", { type: "error" });
    navigate("/applets");
    toast("Applet created", { type: "success" });
  };

  const onServiceActionClick = (id: number) => {
    setSelectedServiceAction(id);
  };

  const onActionClick = (id: number) => {
    setSelectedAction(id);
  };

  const onServiceReactionClick = (id: number) => {
    setSelectedServiceReaction(id);
  };

  const onReactionClick = (id: number) => {
    setSelectedReaction(id);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <NavBar />
      <AppletCreationInputName
        value={appletName}
        onChange={(value) => setAppletName(value)}
      />
      <div className="flex w-full h-full sm:w-5/6 lg:flex-row flex-col justify-between my-10">
        <OptionListContainer
          ContainerTitle={translate(
            "create-applets",
            "supported-services-trigger",
          )}
          children={services.map((service: ServiceObject) => ({
            id: service.id,
            title: service.name,
            logo: "apple",
            isClicked: service.id === selectedServiceAction,
          }))}
          onListObjectClick={onServiceActionClick}
        />
        <OptionListContainer
          ContainerTitle={translate("create-applets", "triggers-for-service")}
          children={
            services
              .find(
                (service: ServiceObject) =>
                  service.id === selectedServiceAction,
              )
              ?.actions.map((action) => ({
                id: action.id,
                title: action.name,
                logo: "apple",
                isClicked: action.id === selectedAction,
              })) ?? []
          }
          onListObjectClick={onActionClick}
        />
        <OptionListContainer
          ContainerTitle={translate(
            "create-applets",
            "supported-services-trigger",
          )}
          children={services.map((service: ServiceObject) => ({
            id: service.id,
            title: service.name,
            logo: "apple",
            isClicked: service.id === selectedServiceReaction,
          }))}
          onListObjectClick={onServiceReactionClick}
        />
        <OptionListContainer
          ContainerTitle={translate("create-applets", "triggers-for-service")}
          children={
            services
              .find(
                (service: ServiceObject) =>
                  service.id === selectedServiceReaction,
              )
              ?.reactions.map((reaction) => ({
                id: reaction.id,
                title: reaction.name,
                logo: "apple",
                isClicked: reaction.id === selectedReaction,
              })) ?? []
          }
          onListObjectClick={onReactionClick}
        />
      </div>
      <div
        className={`text-white font-bold px-10 py-4 rounded-[20px] text-[28px] my-8
        ${
          appletName.length === 0 ||
          !selectedServiceAction ||
          !selectedAction ||
          !selectedServiceReaction ||
          !selectedReaction
            ? "bg-[#000000CC] cursor-not-allowed"
            : "bg-black hover:bg-[#00000099] cursor-pointer"
        }`}
        onClick={onAppletCreation}
      >
        <p className="w-full text-center">
          {translate("create-applets", "next-button")}
        </p>
      </div>
      <Footer />
    </div>
  );
}
