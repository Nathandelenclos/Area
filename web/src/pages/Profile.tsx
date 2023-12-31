import NavBar from "@components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AUTH_LIST, AuthItem } from "@interfaces/handle.auth";
import Footer from "@src/components/Footer";
import ProfileMainInfo from "@src/components/ProfileMainInfo";
import ServiceList from "@src/components/ServiceList";
import TopBarTitle from "@src/components/TopBarTitle";
import TopBarTitleSmaller from "@src/components/TopBarTitleSmaller";
import GlobalContext from "@src/context/GlobalContextProvider";
import { AuthServices } from "@services/AuthServices";

function ConnectedServiceList({
  coServicesList,
  logout,
}: {
  coServicesList: AuthItem[];
  logout: (value: number) => void;
}) {
  const { translate } = GlobalContext();
  return (
    <div className={"flex flex-col w-full h-auto items-center mt-10"}>
      <p className={"text-[30px] font-semibold text-center"}>
        {translate("profile", "connected-services")}
      </p>
      {coServicesList.map((item, index) => (
        <div
          key={index}
          className="flex flex-row mt-5 items-center w-1/2 justify-between"
        >
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
            className="cursor-pointer"
            icon={"xmark"}
            size="2x"
            color="red"
            onClick={() => {
              logout(item.id ?? 0);
            }}
          />
        </div>
      ))}
    </div>
  );
}

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
  const { translate, user } = GlobalContext();
  const otherServicesList: AuthItem[] = AUTH_LIST;
  const userOauthList =
    user.oauth.map((item): AuthItem => {
      const service: AuthItem | undefined = AUTH_LIST.find(
        (auth) => auth.provider === item.provider,
      );
      if (!service)
        return {
          id: -1,
          name: "",
          provider: "",
          icon: ["fas", "question"],
          color: "",
          OAuth: () => {
            console.log("pressed");
          },
        };
      return {
        id: +item.id,
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

  const logout = async (id: number) => {
    const resp = await AuthServices.logout(user.getAccessToken(), id);
    if (resp.data) {
      window.location.reload();
    }
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
        <ConnectedServiceList
          coServicesList={coServicesList}
          logout={(value: number) => logout(value)}
        />
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
