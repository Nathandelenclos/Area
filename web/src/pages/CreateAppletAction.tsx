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
import { ActionObject } from "@src/objects/ActionObject";
import { ReactionObject } from "@src/objects/ReactionObject";

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
  const [actionNeedConfig, setActionNeedConfig] = useState<boolean>(false);
  const [reactionNeedConfig, setReactionNeedConfig] = useState<boolean>(false);

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
      return toast(
        "Veuillez selectionner un objet dans chaque colonne et mettre un titre",
        {
          type: "error",
        },
      );
    if (actionNeedConfig || reactionNeedConfig) {
      navigate("/configure-applet", {
        state: {
          appletName,
          selectedServiceAction,
          selectedAction,
          selectedServiceReaction,
          selectedReaction,
          actionNeedConfig,
          reactionNeedConfig,
        },
      });
      return toast("Not implemented yet", { type: "error" });
    }
    // const response = await AppletService.create(
    //   {
    //     name: appletName,
    //     description: "",
    //     is_active: true,
    //     action: selectedAction,
    //     reaction: selectedReaction,
    //     config: undefined,
    //   },
    //   user.getAccessToken(),
    // );
    // if (!response.data)
    //   return toast("Error while creating applet", { type: "error" });
    navigate("/applets");
    toast("Applet created", { type: "success" });
  };

  const errorServiceClick = (
    id: number,
    type: "actions" | "reactions",
  ): boolean => {
    if (type === "actions" && id === selectedServiceAction) {
      setActionNeedConfig(false);
      setSelectedServiceAction(0);
      setSelectedAction(0);
      return true;
    }
    if (type === "reactions" && id === selectedServiceReaction) {
      setReactionNeedConfig(false);
      setSelectedServiceReaction(0);
      setSelectedReaction(0);
      return true;
    }
    return false;
  };

  const onServiceTypeClick = async (
    id: number,
    type: "actions" | "reactions",
  ) => {
    if (errorServiceClick(id, type)) return;
    const response = await AreaService.getAreaOfServiceById(
      user.getAccessToken(),
      id,
      type,
    );
    if (!response.data) return;
    const fetchedServices = response.data;
    fetchedServices.map((e: any) => {
      if (type === "actions") return new ActionObject(e);
      else return new ReactionObject(e);
    });
    setServices((prev) => {
      const resp = services.findIndex((e) => e.id === id);
      if (!resp) return [...prev];
      prev[resp][type] = fetchedServices;
      return [...prev];
    });
    if (type === "actions") setSelectedServiceAction(id);
    else setSelectedServiceReaction(id);
  };

  const onActionClick = (id: number) => {
    const selected = services.find((e) => e.id === selectedServiceAction);
    if (!selected) return;
    const action = selected.actions.find((e: ActionObject) => e.id === id);
    if (!action) return;
    if (action.config?.length > 0) setActionNeedConfig(true);
    else setActionNeedConfig(false);
    setSelectedAction(id);
  };

  const onReactionClick = (id: number) => {
    const selected = services.find((e) => e.id === selectedServiceReaction);
    if (!selected) return;
    const reaction = selected.reactions.find(
      (e: ReactionObject) => e.id === id,
    );
    if (!reaction) return;
    if (reaction.config?.length > 0) setReactionNeedConfig(true);
    else setReactionNeedConfig(false);
    setSelectedReaction(id);
  };

  const actionService = services.filter((e) => e.actions?.length > 0);
  const reactionService = services.filter((e) => e.reactions?.length > 0);

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
            onListObjectClick={(id: number) =>
              onServiceTypeClick(id, "actions")
            }
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
              "triggers-choose-for-service",
            )}
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
            onListObjectClick={(id: number) =>
              onServiceTypeClick(id, "reactions")
            }
          />
          <OptionListContainer
            ContainerTitle={translate(
              "create-applets",
              "reactions-for-service",
            )}
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
          <OptionListContainer
            ContainerTitle={translate(
              "create-applets",
              "reactions-choose-for-service",
            )}
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
          {actionNeedConfig || reactionNeedConfig
            ? translate("create-applets", "config-button")
            : translate("create-applets", "create-button")}
        </p>
      </div>
      <Footer />
    </div>
  );
}
