import React, { useEffect, useState } from "react";
import NavBar from "@components/NavBar";
import OptionListContainer, {
  AppletServiceStruct,
} from "@components/OptionListContainer";
import AppletCreationInputName from "@components/AppletCreationInputName";
import GlobalContext from "@src/context/GlobalContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import AreaService from "@services/AreaService";
import { ServiceObject, ServiceObjectDto } from "@src/objects/ServiceObject";
import Footer from "@src/components/Footer";
import {
  ActionAppletObjectDto,
  ActionObject,
  ActionObjectDto,
} from "@src/objects/ActionAppletObject";
import {
  ReactionAppletObjectDto,
  ReactionObject,
  ReactionObjectDto,
} from "@src/objects/ReactionAppletObject";
import LoadingElement from "@components/LoadingElement";
import { RequireConfigObjectDto } from "@src/objects/RequireConfigObjectDto";
import DefaultModal from "@components/DefaultModal";
import AppletService from "@services/AppletService";
import { NewEventConfig } from "@src/objects/AppletObject";

export function typeToInputType(type: string): string {
  if (!type) return "text";
  switch (type) {
    case "string":
      return "text";
    case "number":
      return "number";
    case "boolean":
      return "checkbox";
    case "date":
      return "datetime-local";
    default:
      return "text";
  }
}

/**
 * CreateAppletAction page displays the create applet action view.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <CreateAppletAction />
 *
 * @returns {JSX.Element} Rendered page.
 */
export default function CreateAppletAction() {
  const { translate, user } = GlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [appletName, setAppletName] = useState<string>("");
  const [services, setServices] = useState<ServiceObject[]>([]);
  const [serviceAction, setServiceAction] = useState<ActionObjectDto[]>([]);
  const [selectedServiceAction, setSelectedServiceAction] =
    useState<number>(-1);
  const [selectedAction, setSelectedAction] = useState<ActionObject[]>([]);
  const [serviceReaction, setServiceReaction] = useState<ReactionObjectDto[]>(
    [],
  );
  const [selectedServiceReaction, setSelectedServiceReaction] =
    useState<number>(0);
  const [selectedReaction, setSelectedReaction] = useState<ReactionObject[]>(
    [],
  );
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [reactionLoading, setReactionLoading] = useState<boolean>(false);
  const [serviceLoading, setServiceLoading] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<ActionObject | null>(null);
  const [modalReaction, setModalReaction] = useState<ReactionObject | null>(
    null,
  );
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  /**
   * Get the services from the API.
   */
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
    if (id) {
      AppletService.getAppletById(+id, user.getAccessToken()).then((applet) => {
        if (!applet) return;
        setAppletName(applet.data.name);
        setSelectedAction(
          applet.data.actions.map(
            (e: ActionAppletObjectDto) =>
              new ActionObject({
                ...e.action,
                configs: e.configs,
              }),
          ),
        );
        setSelectedReaction(
          applet.data.reactions.map(
            (e: ReactionAppletObjectDto) =>
              new ReactionObject({
                ...e.reaction,
                configs: e.configs,
              }),
          ),
        );
        console.log(applet.data);
      });
    }
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
    <div className="w-full flex flex-col items-center justify-between">
      <NavBar />
      <div className="mt-10">
        <AppletCreationInputName
          value={appletName}
          onChange={(value) => setAppletName(value)}
        />
      </div>
      <div className="flex w-10/12 h-full sm:w-5/6 flex-col my-10 items-center">
        <div className="flex flex-row w-full gap-10 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <OptionListContainer
              ContainerTitle={translate(
                "create-applets",
                "supported-services-trigger",
              )}
              children={actionService.map((service: ServiceObject) => ({
                id: service.id,
                title: service.name,
                icon: {
                  icon: ["fab", "apple"],
                  size: "2x",
                  color: "white",
                },
                isClicked: service.id === selectedServiceAction,
              }))}
              onListObjectClick={(id: number) => {
                setSelectedServiceAction(id);
                setActionLoading(true);
                getActions(id);
              }}
            />
          </div>
          <div className="flex-1 min-w-[300px]">
            <OptionListContainer
              ContainerTitle={translate(
                "create-applets",
                "supported-services-trigger",
              )}
              loading={actionLoading}
              children={serviceAction.map((action: ActionObjectDto) => ({
                id: action.id,
                title: action.name,
                isClicked: false,
              }))}
              onListObjectClick={(id: number) => {
                const selected = serviceAction.find((e) => e.id === id);
                if (!selected) return;
                const newAction = new ActionObject({
                  ...selected,
                  configs: selected.config.map(
                    (config: RequireConfigObjectDto) => ({
                      key: config.key,
                      value: "",
                    }),
                  ),
                });
                if (selected.config.length > 0) {
                  setModalAction(newAction);
                } else {
                  setSelectedAction([newAction, ...selectedAction]);
                }
              }}
            />
          </div>
          <div className="flex-1 min-w-[300px]">
            <OptionListContainer
              ContainerTitle={translate(
                "create-applets",
                "supported-services-trigger",
              )}
              children={selectedAction.map((action: ActionObject) => {
                const props: AppletServiceStruct = {
                  id: action.id ?? -1,
                  title: action.name,
                  isClicked: false,
                };
                if (action.config && action.config.length > 0)
                  return {
                    ...props,
                    icon: {
                      icon: "cog",
                      size: "2x",
                      color: "white",
                    },
                  };
                return props;
              })}
              onListDeleteClick={(id: number, index) => {
                const newSelectedAction = [...selectedAction];
                newSelectedAction.splice(index, 1);
                setSelectedAction(newSelectedAction);
              }}
              onListObjectClick={(id, index) => {
                const selected = selectedAction[index];
                if (!selected) return;
                setModalAction(selected);
                setIsEdit(true);
                return;
              }}
            />
          </div>
        </div>

        <div className="flex flex-row w-full gap-10 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <OptionListContainer
              ContainerTitle={translate(
                "create-applets",
                "supported-services-trigger",
              )}
              children={reactionService.map((service: ServiceObject) => ({
                id: service.id,
                title: service.name,
                icon: {
                  icon: ["fab", "apple"],
                  size: "2x",
                  color: "white",
                },
                isClicked: service.id === selectedServiceReaction,
              }))}
              onListObjectClick={(id: number) => {
                setSelectedServiceReaction(id);
                setReactionLoading(true);
                getReactions(id);
              }}
            />
          </div>
          <div className="flex-1 min-w-[300px]">
            <OptionListContainer
              ContainerTitle={translate(
                "create-applets",
                "supported-services-trigger",
              )}
              loading={reactionLoading}
              children={serviceReaction.map((action: ReactionObjectDto) => {
                return {
                  id: action.id,
                  title: action.name,
                  isClicked: false,
                } as AppletServiceStruct;
              })}
              onListObjectClick={(id: number) => {
                const selected = serviceReaction.find((e) => e.id === id);
                if (!selected) return;
                const newReaction = new ReactionObject({
                  ...selected,
                  configs: selected.config.map(
                    (config: RequireConfigObjectDto) => ({
                      key: config.key,
                      value: "",
                    }),
                  ),
                });
                if (selected.config.length > 0) {
                  setModalReaction(newReaction);
                } else {
                  setSelectedReaction([newReaction, ...selectedReaction]);
                }
              }}
            />
          </div>
          <div className="flex-1 min-w-[300px]">
            <OptionListContainer
              ContainerTitle={translate(
                "create-applets",
                "supported-services-trigger",
              )}
              children={selectedReaction.map((reaction: ReactionObject) => {
                const props: AppletServiceStruct = {
                  id: reaction.id ?? -1,
                  title: reaction.name,
                  isClicked: false,
                };
                if (reaction.config && reaction.config.length > 0)
                  return {
                    ...props,
                    icon: {
                      icon: "cog",
                      size: "2x",
                      color: "white",
                    },
                  };
                return props;
              })}
              onListDeleteClick={(id: number, index) => {
                const newSelectedReaction = [...selectedReaction];
                newSelectedReaction.splice(index, 1);
                setSelectedReaction(newSelectedReaction);
              }}
              onListObjectClick={(id: number, index: number) => {
                const selected = selectedReaction[index];
                if (!selected) return;
                setModalReaction(selected);
                setIsEdit(true);
              }}
            />
          </div>
        </div>

        <div className="max-w-7xl">
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
              if (
                appletName.length === 0 ||
                selectedAction.length === 0 ||
                selectedReaction.length === 0
              )
                return;
              setCreateLoading(true);
              const applet = {
                name: appletName,
                description: "",
                is_active: true,
                actions: selectedAction.map((action) => {
                  if (!action.configs)
                    return {
                      id: action.id,
                      config: {},
                    } as NewEventConfig;
                  return {
                    id: action.id,
                    config: action.configs?.reduce((acc, config) => {
                      return {
                        ...acc,
                        [config.key]: config.value,
                      };
                    }, {}),
                  } as NewEventConfig;
                }),
                reactions: selectedReaction.map((reaction) => {
                  if (!reaction.configs)
                    return {
                      id: reaction.id,
                      config: {},
                    } as NewEventConfig;
                  return {
                    id: reaction.id,
                    config: reaction.configs?.reduce((acc, config) => {
                      return {
                        ...acc,
                        [config.key]: config.value,
                      };
                    }, {}),
                  } as NewEventConfig;
                }),
              };
              if (id)
                AppletService.updateApplet(
                  +id,
                  applet,
                  user.getAccessToken(),
                ).then(() => {
                  setCreateLoading(false);
                  navigate("/my-applets");
                });
              else
                AppletService.create(applet, user.getAccessToken()).then(() => {
                  setCreateLoading(false);
                  navigate("/my-applets");
                });
              return;
            }}
          >
            <p className="w-full text-center">
              {createLoading ? (
                <LoadingElement />
              ) : id ? (
                translate("create-applets", "edit-button")
              ) : (
                translate("create-applets", "create-button")
              )}
            </p>
          </div>
        </div>
      </div>

      <DefaultModal
        isOpen={modalAction !== null || modalReaction !== null}
        onOk={() => {
          if (modalAction && !isEdit)
            setSelectedAction([modalAction, ...selectedAction]);
          if (modalReaction && !isEdit)
            setSelectedReaction([modalReaction, ...selectedReaction]);

          setIsEdit(false);
          setModalAction(null);
          setModalReaction(null);
        }}
        onClose={() => {
          setModalAction(null);
          setModalReaction(null);
        }}
      >
        <div className="flex flex-col gap-3">
          {(modalAction || modalReaction)?.config.map(
            (config: RequireConfigObjectDto, index: number) => (
              <div className="flex flex-col gap-2" key={index}>
                <div className="flex flex-col ">
                  <label
                    className="block text-gray-700 font-bold "
                    htmlFor={config.key}
                  >
                    {config.name}
                  </label>
                  <p className="text-s mb-2 text-gray-700">
                    {config.description}
                  </p>
                  <input
                    defaultValue={
                      modalAction && modalAction.configs
                        ? modalAction.configs[index].value
                        : modalReaction && modalReaction.configs
                        ? modalReaction.configs[index].value
                        : ""
                    }
                    onChange={(e) => {
                      if (modalAction && modalAction.configs) {
                        modalAction.configs[index].value = e.target.value;
                      }
                      if (modalReaction && modalReaction.configs) {
                        modalReaction.configs[index].value = e.target.value;
                      }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={config.key}
                    type={typeToInputType(config.type)}
                    placeholder={config.name}
                  />
                </div>
              </div>
            ),
          )}
        </div>
      </DefaultModal>
      <Footer />
    </div>
  );
}
