import React, { useEffect, useState } from "react";
import NavBar from "@components/NavBar";
import OptionListContainer from "@components/OptionListContainer";
import AppletCreationInputName from "@components/AppletCreationInputName";
import AppContext from "context/AppContextProvider";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import AppletService from "@services/AppletService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AreaService from "@services/AreaService";
import { ServiceObject, ServiceObjectDto } from "@src/objects/ServiceObject";

type AppletServiceStruct = {
  id: number;
  title: string;
  logo?: IconName;
  isClicked: boolean;
};

export default function CreateAppletTrigger() {
  const { translate, user } = AppContext();
  const navigate = useNavigate();
  const [appletName, setAppletName] = useState<string>("");
  const [services, setServices] = useState<ServiceObject[]>([]);
  const [selectedService, setSelectedService] = useState<number>(0);
  const [selectedAction, setSelectedAction] = useState<number>(0);

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
    const response = await AppletService.create(
      {
        name: appletName,
        description: "",
        is_active: true,
        action: 1,
        reaction: 1,
        config: undefined,
      },
      user.getAccessToken(),
    );
    if (!response.data)
      return toast("Error while creating applet", { type: "error" });
    navigate("/create-applet-reaction");
    toast("Applet created", { type: "success" });
  };

  const onServiceClick = (id: number) => {
    console.log(id);
  };

  const onActionClick = (id: number) => {
    console.log(id);
  };

  /*
  *  id: number;
  title: string;
  logo?: IconName;
  isClicked: boolean;
  * */

  return (
    <div className="w-full h-full flex flex-col items-center">
      <NavBar />
      <div className="flex w-5/6 justify-between my-10 overflow-hidden">
        <AppletCreationInputName
          value={appletName}
          onChange={(value) => setAppletName(value)}
        />
        <OptionListContainer
          ContainerTitle={translate(
            "create-applets",
            "supported-services-trigger",
          )}
          children={services.map((service: ServiceObject) => ({
            id: service.id,
            title: service.name,
            logo: "cloud",
            isClicked: false,
          }))}
          onListObjectClick={onServiceClick}
        />
        <OptionListContainer
          ContainerTitle={translate("create-applets", "triggers-for-service")}
          children={
            services
              .find((service: ServiceObject) => service.id === selectedService)
              ?.actions.map((action) => ({
                id: action.id,
                title: action.name,
                logo: "arrow-right",
                isClicked: false,
              })) ?? []
          }
          onListObjectClick={onActionClick}
        />
      </div>
      <div
        className="bg-black text-white font-bold px-20 py-2 rounded-[20px] text-[28px] my-8 hover:bg-[#00000099] cursor-pointer"
        onClick={onAppletCreation}
      >
        <p>Suivant</p>
      </div>
    </div>
  );
}
