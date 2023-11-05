import React, { useEffect, useState } from "react";
import NavBar from "@components/NavBar";
import OptionListContainer from "@components/OptionListContainer";
import AppletCreationInputName from "@components/AppletCreationInputName";
import AppContext from "context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import AreaService from "@services/AreaService";
import { ServiceObject, ServiceObjectDto } from "@src/objects/ServiceObject";
import Footer from "@src/components/Footer";
import { ActionObjectDto } from "@src/objects/ActionObject";
import { ReactionObjectDto } from "@src/objects/ReactionObject";
import LoadingElement from "@components/LoadingElement";

export default function CreateAppletAction() {
  const { translate } = AppContext();
  const navigate = useNavigate();
  const [appletName, setAppletName] = useState<string>("");
  const [services, setServices] = useState<ServiceObject[]>([]);
  const [serviceAction, setServiceAction] = useState<ActionObjectDto[]>([]);
  const [selectedServiceAction, setSelectedServiceAction] =
    useState<number>(-1);
  const [selectedAction, setSelectedAction] = useState<ActionObjectDto[]>([]);
  const [serviceReaction, setServiceReaction] = useState<ReactionObjectDto[]>(
    [],
  );
  const [selectedServiceReaction, setSelectedServiceReaction] =
    useState<number>(0);
  const [selectedReaction, setSelectedReaction] = useState<ReactionObjectDto[]>(
    [],
  );
  const [actionNeedConfig, setActionNeedConfig] = useState<ActionObjectDto[]>(
    [],
  );
  const [reactionNeedConfig, setReactionNeedConfig] = useState<
    ReactionObjectDto[]
  >([]);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [reactionLoading, setReactionLoading] = useState<boolean>(false);
  const [serviceLoading, setServiceLoading] = useState<boolean>(false);

  const getServices = async () => {
    setServiceLoading(true);
    const response = await AreaService.getServices();
    if (!response.data) return;

    const fetchedServices = response.data;
    const serviceObjects: ServiceObject[] = fetchedServices.map(
      (service: ServiceObjectDto) => new ServiceObject(service),
    );
    setServices(serviceObjects);
    setServiceLoading(false);
  };

  const getActions = async (id: number) => {
    const response = await AreaService.getAreaOfServiceById(id, "actions");
    if (!response.data) return;
    const actionObjects = response.data as ActionObjectDto[];
    setServiceAction(actionObjects);
    setActionLoading(false);
  };

  const getReactions = async (id: number) => {
    const response = await AreaService.getAreaOfServiceById(id, "reactions");
    if (!response.data) return;
    const reactionObjects = response.data as ReactionObjectDto[];
    setReactionLoading(false);
    setServiceReaction(reactionObjects);
  };

  useEffect(() => {
    getServices();
  }, []);

  const actionService = services.filter((e) => e.actions?.length > 0);
  const reactionService = services.filter((e) => e.reactions?.length > 0);

  if (serviceLoading)
    return (
      <div className="w-full h-full flex flex-col items-center">
        <NavBar />
        <div className="flex w-full h-full items-center justify-center">
          <LoadingElement />
        </div>
        <Footer />
      </div>
    );
  return (
    <div className="w-full h-full flex flex-col items-center">
      <NavBar />
      <AppletCreationInputName
        value={appletName}
        onChange={(value) => setAppletName(value)}
      />
      <div className="flex w-full h-full sm:w-5/6 flex-col justify-between my-10">
        <div className="flex flex-row w-full">
          <OptionListContainer
            ContainerTitle={translate(
              "create-applets",
              "supported-services-trigger",
            )}
            children={actionService.map((service: ServiceObject) => ({
              id: service.id,
              title: service.name,
              logo: "apple",
              isClicked: service.id === selectedServiceAction,
            }))}
            onListObjectClick={(id: number) => {
              setSelectedServiceAction(id);
              setActionLoading(true);
              getActions(id);
            }}
          />
          <OptionListContainer
            ContainerTitle={translate(
              "create-applets",
              "supported-services-trigger",
            )}
            loading={actionLoading}
            children={serviceAction.map((action: ActionObjectDto) => ({
              id: action.id,
              title: action.name,
              logo: "apple",
              isClicked: false,
            }))}
            onListObjectClick={(id: number) => {
              const selected = serviceAction.find((e) => e.id === id);
              if (!selected) return;
              setSelectedAction([selected, ...selectedAction]);
              console.log(selected.config);
              if (selected.config.length > 0) {
                setActionNeedConfig([selected, ...actionNeedConfig]);
              }
            }}
          />
          <OptionListContainer
            ContainerTitle={translate(
              "create-applets",
              "supported-services-trigger",
            )}
            children={selectedAction.map((selectedAction: ActionObjectDto) => ({
              id: selectedAction.id,
              title: selectedAction.name,
              logo: "apple",
              isClicked: false,
            }))}
            onListObjectClick={(id: number) => {
              return;
            }}
          />
        </div>
        <div className="flex flex-row w-full">
          <OptionListContainer
            ContainerTitle={translate(
              "create-applets",
              "supported-services-trigger",
            )}
            children={reactionService.map((service: ServiceObject) => ({
              id: service.id,
              title: service.name,
              logo: "apple",
              isClicked: service.id === selectedServiceReaction,
            }))}
            onListObjectClick={(id: number) => {
              setSelectedServiceReaction(id);
              setReactionLoading(true);
              getReactions(id);
            }}
          />
          <OptionListContainer
            ContainerTitle={translate(
              "create-applets",
              "supported-services-trigger",
            )}
            loading={reactionLoading}
            children={serviceReaction.map((action: ReactionObjectDto) => ({
              id: action.id,
              title: action.name,
              logo: "apple",
              isClicked: false,
            }))}
            onListObjectClick={(id: number) => {
              const selected = serviceReaction.find((e) => e.id === id);
              if (!selected) return;
              setSelectedReaction([selected, ...selectedReaction]);
              console.log(selected.config);
              if (selected.config.length > 0) {
                setReactionNeedConfig([selected, ...reactionNeedConfig]);
              }
            }}
          />
          <OptionListContainer
            ContainerTitle={translate(
              "create-applets",
              "supported-services-trigger",
            )}
            children={selectedReaction.map(
              (selectedReaction: ReactionObjectDto) => ({
                id: selectedReaction.id,
                title: selectedReaction.name,
                logo: "apple",
                isClicked: false,
              }),
            )}
            onListObjectClick={(id: number) => {
              return;
            }}
          />
        </div>
      </div>
      <div
        className={`text-white font-bold px-10 py-4 rounded-[20px] text-[28px] my-8
        ${
          appletName.length === 0 ||
          selectedAction.length === 0 ||
          selectedReaction.length === 0
            ? "bg-[#000000CC] cursor-not-allowed"
            : "bg-black hover:bg-[#00000099] cursor-pointer"
        }`}
        onClick={() => {
          navigate("/configure-applet", {
            state: {
              appletName,
              selectedAction,
              selectedReaction,
              actionNeedConfig,
              reactionNeedConfig,
            },
          });
          return;
        }}
      >
        <p className="w-full text-center">
          {actionNeedConfig.length > 0 || reactionNeedConfig.length > 0
            ? translate("create-applets", "config-button")
            : translate("create-applets", "create-button")}
        </p>
      </div>
      <Footer />
    </div>
  );
}
