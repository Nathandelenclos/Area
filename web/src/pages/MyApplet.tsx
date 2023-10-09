import React from "react";
import NavBar from "@components/NavBar";
import AppletButton from "@components/Applet/AppletButton";
import HeaderMyApplet from "@components/Applet/HeaderMyApplet";
import HeaderEditApplet from "@components/Applet/HeaderEditApplet";
import AppContext from "@src/context/AppContextProvider";

type Applet = {
  id: number;
  title: string;
  color: string;
};

export default function MyApplet() {
  const [applets, setApplets] = React.useState<Applet[]>([
    {
      id: 1,
      title: "Send an email when a Elon Musk posts a new tweet",
      color: "#7A73E7",
    },
    {
      id: 2,
      title: "Start a Spotify playlist when you arrive in a certain location",
      color: "#FF6666",
    },
  ]);
  const [selectedApplet, setSelectedApplet] = React.useState<any>({ id: 0 });
  const { translate } = AppContext();

  function CreateApplet() {
    console.log("Create Applet");
  }

  function EditApplet(applet: any) {
    if (applet.id === selectedApplet.id) {
      setSelectedApplet({ id: 0 });
    } else {
      setSelectedApplet(applet);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-initial">
        <NavBar />
        <HeaderMyApplet CreateApplet={CreateApplet} />
      </div>
      <div className="flex flex-row flex-auto justify-center overflow-hidden">
        <div className="h-full w-full relative">
          <div className="flex flex-row h-full justify-center">
            <div className="w-1/4 h-full relative overflow-y-scroll scrollbar-hide">
              {applets.map((applet) => (
                <AppletButton
                  title={applet.title}
                  key={applet.id}
                  color={applet.color}
                  onPress={() => EditApplet(applet)}
                />
              ))}
            </div>
            {selectedApplet.id !== 0 ? (
              <div className="w-3/5 h-full p-5">
                <div
                  className="w-full h-full border-2 rounded-xl flex overflow-hidden"
                  style={{ borderColor: selectedApplet.color }}
                >
                  <HeaderEditApplet applet={selectedApplet} />
                </div>
              </div>
            ) : (
              <div className="w-3/5 h-full p-5">
                <div className="w-full h-full border-2 rounded-xl border-black flex items-center justify-center">
                  <p className="text-[#808080] text-3xl">
                    {translate("applets", "selectApplet")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
