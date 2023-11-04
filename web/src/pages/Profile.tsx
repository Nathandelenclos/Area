import React from "react";
import NavBar from "@components/NavBar";
import AppContext from "@src/context/AppContextProvider";
import TopBarTitle from "@src/components/TopBarTitle";
import ProfileMainInfo from "@src/components/ProfileMainInfo";
import ServiceList from "@src/components/ServiceList";
import { IconName } from "@fortawesome/free-solid-svg-icons";
import TopBarTitleSmaller from "@src/components/TopBarTitleSmaller";
import Footer from "@src/components/Footer";

/**
 * Type for the list of services.
 * @interface listType
 */
type listType = {
  /**
   * Logo of the service.
   */
  logo: IconName;
  /**
   * Color of the button.
   */
  color: string;
};

const connectedServicesList: listType[] = [
  { logo: "spotify", color: "#00AD30" },
  { logo: "spotify", color: "#00AD30" },
  { logo: "spotify", color: "#00AD30" },
  { logo: "spotify", color: "#00AD30" },
  { logo: "spotify", color: "#00AD30" },
  { logo: "spotify", color: "#00AD30" },
];

const otherServicesList: listType[] = [
  { logo: "spotify", color: "#000000" },
  { logo: "spotify", color: "#000000" },
  { logo: "spotify", color: "#000000" },
  { logo: "spotify", color: "#000000" },
  { logo: "spotify", color: "#000000" },
  { logo: "spotify", color: "#000000" },
  { logo: "spotify", color: "#000000" },
  { logo: "spotify", color: "#000000" },
];

/**
 * Profile page displays the profile view.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <Profile />
 *
 * @returns {JSX.Element} Rendered component.
 */
export default function Profile() {
  const { translate } = AppContext();

  return (
    <div className="flex w-full h-full flex-col">
      <NavBar />
      <div className="w-full justify-center mt-20 mb-10 hidden md:flex">
        <TopBarTitle />
      </div>
      <div className="w-full justify-center mt-10 mb-10 flex md:hidden">
        <TopBarTitleSmaller />
      </div>
      <ProfileMainInfo />
      <div className="flex flex-col md:flex-row w-full">
        <ServiceList
          title={translate("profile", "connected-services")}
          list={connectedServicesList}
        />
        <ServiceList
          title={translate("profile", "connect-other-services")}
          list={otherServicesList}
        />
      </div>
      <Footer />
    </div>
  );
}
