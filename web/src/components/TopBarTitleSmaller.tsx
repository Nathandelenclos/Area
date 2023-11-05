import GlobalContext from "@src/context/GlobalContextProvider";
import { UserObject, UserObjectDto } from "@src/objects/UserObject";
import { useNavigate } from "react-router-dom";

/**
 * TopBarTitleSmaller component displays the title of the top bar when on phone.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <TopBarTitleSmaller />
 *
 * @returns {JSX.Element} Rendered component.
 */
export default function TopBarTitleSmaller() {
  const { translate, setUser } = GlobalContext();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-4xl font-bold my-5">
        {translate("profile", "title")}
      </h1>
      <div className="bg-black hover:bg-[#000000CC] rounded-lg py-2 px-8 flex flex-row hover:cursor-pointer">
        <p
          className="text-white font-bold mr-1 text-3xl"
          onClick={() => {
            localStorage.removeItem("accessToken");
            setUser(new UserObject({} as UserObjectDto));
            navigate("/");
          }}
        >
          {translate("profile", "logout-button")}
        </p>
      </div>
    </div>
  );
}
