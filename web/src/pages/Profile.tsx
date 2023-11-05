import React from "react";
import NavBar from "@components/NavBar";
import GlobalContext from "@src/context/GlobalContextProvider";
import TopBarTitle from "@src/components/TopBarTitle";
import ProfileMainInfo from "@src/components/ProfileMainInfo";
import ServiceList from "@src/components/ServiceList";
import TopBarTitleSmaller from "@src/components/TopBarTitleSmaller";
import Footer from "@src/components/Footer";
import { AUTH_LIST, AuthItem } from "@interfaces/handle.auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
  const { translate, user } = GlobalContext();
  console.log(user.oauth);
  const otherServicesList: AuthItem[] = AUTH_LIST;
  const userOauthList =
    user.oauth.map((item): AuthItem => {
      const service: AuthItem | undefined = AUTH_LIST.find(
        (auth) => auth.provider === item.provider,
      );
      if (!service)
        return {
          name: "",
          provider: "",
          icon: ["fas", "question"],
          color: "",
          OAuth: () => {
            console.log("pressed");
          },
        };
      return {
        name: item.email,
        provider: service.provider,
        icon: service.icon,
        color: service.color,
        OAuth: () => {
          console.log("pressed");
        },
      };
    }) ?? [];

  const coServicesList: AuthItem[] =
    userOauthList.filter((item) => item.name) ?? [];

  const logout = () => {
    //todo: LOGOUT SERVICE;
    return;
  };

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
        <div className="flex flex-col w-full items-center">
          <p className={"text-[30px] font-semibold text-center"}>
            {translate("profile", "connected-services")}
          </p>
          {coServicesList.map((item, index) => (
            <div key={index} className="flex flex-row mt-5 items-center">
              <div
                style={{
                  backgroundColor: item.color,
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <FontAwesomeIcon icon={item.icon} size="2x" color="white" />
              </div>
              <p className="mx-5">{item.name}</p>
              <FontAwesomeIcon
                icon={"xmark"}
                size="2x"
                color="red"
                onClick={logout}
              />
            </div>
          ))}
        </div>
        <ServiceList
          title={translate("profile", "connect-other-services")}
          list={otherServicesList}
          forceColor={"#6F6F6F"}
        />
      </div>
      <Footer />
    </div>
  );
}
