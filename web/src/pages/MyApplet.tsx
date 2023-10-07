import React from "react";
import NavBar from "@components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faClone,
  faPause,
  faPenToSquare,
  faStar,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function AppletButton({
  title,
  color,
  onPress,
}: {
  title: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <div
      onClick={onPress}
      className="flex w-full rounded-lg h-[100px] items-center justify-center mt-5 cursor-pointer"
      style={{ backgroundColor: color }}
    >
      <p className="text-white font-bold text-center text-xl px-5 text-ellipsis overflow-hidden">
        {title}
      </p>
    </div>
  );
}

function HeaderMyApplet({ CreateApplet }: { CreateApplet: () => void }) {
  return (
    <div className="w-full flex justify-center mt-5">
      <div className="flex flex-row items-center justify-between w-10/12 px-5">
        <h1 className="text-3xl font-bold min-w-fit mr-10">My Applets</h1>
        <div className="h-1 w-full bg-black" />
        <div
          className="min-w-fit ml-10 bg-black rounded-lg p-2 flex flex-row hover:cursor-pointer items-center justify-center"
          onClick={CreateApplet}
        >
          <p className="text-white font-bold mr-2 text-3xl">Create</p>
          <FontAwesomeIcon icon={faCirclePlus} size={"lg"} color={"white"} />
        </div>
      </div>
    </div>
  );
}

function HeaderEditApplet({ applet }: { applet: any }) {
  const [icons, setIcons] = React.useState([
    {
      id: 1,
      icon: faPause,
      onPress: () => console.log("Pause"),
    },
    {
      id: 2,
      icon: faPenToSquare,
      onPress: () => console.log("Edit"),
    },
    {
      id: 3,
      icon: faStar,
      onPress: () => console.log("Favorite"),
    },
    {
      id: 4,
      icon: faClone,
      onPress: () => console.log("Clone"),
    },
    {
      id: 5,
      icon: faTrashCan,
      onPress: () => console.log("Delete"),
    },
  ]);

  return (
    <div
      className="w-full h-1/6 flex flex-row items-center justify-between px-5"
      style={{ backgroundColor: applet.color }}
    >
      <p className="text-white text-3xl font-bold p-3">{applet.title}</p>
      <div className="min-w-fit">
        {icons.map((icon) => (
          <FontAwesomeIcon
            icon={icon.icon}
            size={"xl"}
            color={"white"}
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={icon.onPress}
            key={icon.id}
          />
        ))}
      </div>
    </div>
  );
}

export default function MyApplet() {
  const [applets, setApplets] = React.useState([
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
                    Click on an applet to edit
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
