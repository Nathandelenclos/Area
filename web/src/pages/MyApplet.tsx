import React, { useEffect, useState } from "react";
import NavBar from "@components/NavBar";
import AppletButton from "@components/Applet/AppletButton";
import HeaderMyApplet from "@components/Applet/HeaderMyApplet";
import HeaderEditApplet, {
  ActionIcon,
} from "@components/Applet/HeaderEditApplet";
import GlobalContext from "@src/context/GlobalContextProvider";
import { AppletObject } from "../objects/AppletObject";
import { useNavigate } from "react-router-dom";
import AppletService from "@services/AppletService";
import Footer from "@src/components/Footer";
import {
  faClone,
  faPause,
  faPenToSquare,
  faPlay,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import LoadingElement from "@components/LoadingElement";
import app from "@src/App";

/**
 * MyApplet page displays the my applet view.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <MyApplet />
 *
 * @returns {JSX.Element} Rendered page.
 */
export default function MyApplet() {
  const { translate, user } = GlobalContext();
  const navigate = useNavigate();
  const [selectedApplet, setSelectedApplet] = useState<AppletObject | null>(
    null,
  );
  const [applets, setApplets] = useState<AppletObject[]>([]);
  const [appletsLoading, setAppletsLoading] = useState<boolean>(false);

  /**
   * Check if the user is already logged in.
   */
  useEffect(() => {
    if (!user.getAccessToken()) return;
    setAppletsLoading(true);
    getMyApplets();
  }, [user]);

  /**
   * Get the applets from the API.
   */
  const getMyApplets = async () => {
    const applets = await AppletService.getApplets(user.getAccessToken());
    console.log("Mesapplet", applets);
    setApplets(applets);
    setAppletsLoading(false);
  };

  /**
   * Execute the function when an applet is clicked.
   */
  function onAppletClick(applet: AppletObject) {
    setSelectedApplet(applet.id === selectedApplet?.id ? null : applet);
  }

  const actions: ActionIcon[] = [
    {
      icon: selectedApplet?.is_active ? faPause : faPlay,
      onPress: async () => {
        if (!selectedApplet) return;
        selectedApplet.is_active = !selectedApplet.is_active;
        const data = await AppletService.updateApplet(
          selectedApplet.id,
          selectedApplet.toNewAppletRequest(),
          user.getAccessToken(),
        );
        setSelectedApplet(new AppletObject({ ...data.data }));
      },
    },
    {
      icon: faPenToSquare,
      onPress: async () => {
        if (!selectedApplet) return;
        navigate(`/edit-applet/${selectedApplet.id}`);
      },
    },
    {
      icon: faClone,
      onPress: async () => {
        if (!selectedApplet) return;
        setAppletsLoading(true);
        await AppletService.create(
          selectedApplet.toNewAppletRequest(),
          user.getAccessToken(),
        );
        await getMyApplets();
      },
    },
    {
      icon: faTrashCan,
      onPress: async () => {
        if (!selectedApplet) return;
        setAppletsLoading(true);
        await AppletService.delete(selectedApplet.id, user.getAccessToken());
        await getMyApplets();
        setSelectedApplet(null);
        setAppletsLoading(false);
      },
    },
  ];

  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full flex-initial">
        <NavBar />
        <HeaderMyApplet CreateApplet={() => navigate("/create-applet")} />
      </div>
      <div className="flex flex-col md:flex-row flex-auto justify-center">
        <div className="w-full relative">
          <div className="flex flex-col md:flex-row h-full justify-center">
            <div className="w-full md:w-1/4 h-auto relative overflow-y-scroll scrollbar-hide">
              {appletsLoading && (
                <div className="w-full h-full flex justify-center">
                  <LoadingElement />
                </div>
              )}
              {!appletsLoading &&
                applets &&
                applets.map((applet) => {
                  return (
                    <AppletButton
                      key={applet.id}
                      title={applet.name}
                      color={
                        applet.id === selectedApplet?.id
                          ? "#38356C"
                          : applet.color?.length > 0
                          ? applet.color
                          : "#7A73E7"
                      }
                      onClick={() => onAppletClick(applet)}
                    />
                  );
                })}
            </div>
            {selectedApplet && selectedApplet?.id !== 0 ? (
              <div className="w-full md:w-3/5 p-5">
                <div
                  className="w-full min-h-full border-2 rounded-xl space-y-14 mb-10"
                  style={{ borderColor: "#7A73E7" }}
                >
                  <HeaderEditApplet applet={selectedApplet} actions={actions} />
                  <div className="mx-12 space-y-5 ">
                    <p>Action: </p>
                    {selectedApplet.actions &&
                      selectedApplet.actions.map((e, index) => {
                        const reaction = e.action;
                        const config = e.configs;
                        return (
                          <div
                            className="rounded-2xl p-4"
                            style={{
                              backgroundColor:
                                selectedApplet.color ?? "#7A73E7",
                            }}
                            key={index}
                          >
                            <div className="flex flex-row flex-wrap items-center">
                              <p className="text-white text-3xl font-bold p-3">
                                {reaction?.name}
                              </p>
                              <p className="text-white text-2xl">
                                - {reaction?.description}
                              </p>
                            </div>
                            {config &&
                              config.map((e) => (
                                <p className="text-white text-xl pl-3">
                                  {e.key}: {e.value}
                                </p>
                              ))}
                          </div>
                        );
                      })}
                    <p>Reaction: </p>
                    {selectedApplet.reactions &&
                      selectedApplet.reactions.map((e, index) => {
                        const reaction = e.reaction;
                        const config = e.configs;
                        return (
                          <div
                            className="rounded-2xl p-4"
                            style={{
                              backgroundColor:
                                selectedApplet.color ?? "#7A73E7",
                            }}
                            key={index}
                          >
                            <div className="flex flex-row flex-wrap items-center">
                              <p className="text-white text-3xl font-bold p-3">
                                {reaction?.name}
                              </p>
                              <p className="text-white text-2xl">
                                - {reaction?.description}
                              </p>
                            </div>
                            {config &&
                              config.map((e) => (
                                <p className="text-white text-xl pl-3">
                                  {e.key}: {e.value}
                                </p>
                              ))}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full md:w-3/5 h-full p-5">
                <div className="w-full h-full border-2 rounded-xl border-black flex items-center justify-center">
                  <p className="text-[#808080] text-3xl text-center break-all px-5">
                    {translate("applets", "select")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
