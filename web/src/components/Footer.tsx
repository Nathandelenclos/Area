import GlobalContext from "@src/context/GlobalContextProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Footer component displays the footer of the application.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <Footer />
 *
 * @returns {JSX.Element} Rendered component.
 */
function Footer() {
  const { translate } = GlobalContext();
  const navigate = useNavigate();

  return (
    <div className="w-full mt-10 border-t-2 border-[##E9E9E9]">
      <div className="w-full flex-col h-fit drop-shadow bg-white flex justify-center px-10 py-5 items-center">
        <div className="cursor-pointer flex flex-row justify-center items-center hover:opacity-80 my-5">
          <div className="bg-black px-3 py-2 rounded-[10px]">
            <FontAwesomeIcon icon={"download"} size="lg" color="white" />
          </div>
          <a
            className="font-semibold px-2 text-[20px]"
            href="/client.apk"
            download
          >
            {translate("homepage", "download-apk")}
          </a>
        </div>
        <p className="text-xs">{translate("footer", "copyright")}</p>
        <p className="text-xs">{translate("footer", "created-by")}</p>
      </div>
    </div>
  );
}

export default Footer;
