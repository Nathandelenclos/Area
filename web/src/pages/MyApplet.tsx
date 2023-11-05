import React, { useEffect, useState } from "react";
import NavBar from "@components/NavBar";
import AppletButton from "@components/Applet/AppletButton";
import HeaderMyApplet from "@components/Applet/HeaderMyApplet";
import HeaderEditApplet from "@components/Applet/HeaderEditApplet";
import GlobalContext from "@src/context/GlobalContextProvider";
import { AppletObject } from "../objects/AppletObject";
import { useNavigate } from "react-router-dom";
import AppletService from "@services/AppletService";
import Footer from "@src/components/Footer";

export default function MyApplet() {
  const { translate, user } = GlobalContext();
  const navigate = useNavigate();
  const [selectedApplet, setSelectedApplet] = useState<AppletObject | null>(
    null,
  );
  const [applets, setApplets] = useState<AppletObject[]>([]);

  useEffect(() => {
    if (!user.getAccessToken()) return;
    getMyApplets();
  }, [user]);

  const getMyApplets = async () => {
    const applets = await AppletService.getApplets(user.getAccessToken());
    setApplets(applets);
  };

  function onAppletClick(applet: AppletObject) {
    setSelectedApplet(applet.id === selectedApplet?.id ? null : applet);
  }

  console.log(selectedApplet);

  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full flex-initial">
        <NavBar />
        <HeaderMyApplet CreateApplet={() => navigate("/create-applet")} />
      </div>
      <div className="flex flex-col md:flex-row flex-auto justify-center overflow-hidden">
        <div className="h-full w-full relative">
          <div className="flex flex-col md:flex-row h-full justify-center">
            <div className="w-full md:w-1/4 h-auto relative overflow-y-scroll scrollbar-hide">
              {applets &&
                applets.map((applet) => (
                  <AppletButton
                    key={applet.id}
                    title={applet.name}
                    color={
                      applet.id === selectedApplet?.id ? "#38356C" : "#7A73E7"
                    }
                    onClick={() => onAppletClick(applet)}
                  />
                ))}
            </div>
            {selectedApplet && selectedApplet?.id !== 0 ? (
              <div className="w-full md:w-3/5 h-full p-5">
                <div
                  className="w-full h-full border-2 rounded-xl overflow-hidden space-y-14"
                  style={{ borderColor: "#7A73E7" }}
                >
                  <HeaderEditApplet applet={selectedApplet} />
                  <div className="ml-12 mr-12 space-y-5">
                    <p>Action: </p>
                    {selectedApplet.actions &&
                      selectedApplet.actions.map((e, index) => {
                        const reaction = e.action;
                        const config = e.configs;
                        return (
                          <div
                            className="bg-[#7A73E7] rounded-2xl p-4"
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
                            className="bg-[#7A73E7] rounded-2xl p-4"
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
