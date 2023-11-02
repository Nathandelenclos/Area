import AppContext from "context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  const { translate } = AppContext();
  const navigate = useNavigate();

  return (
    <div className="w-full mt-10 border-t-2 border-[##E9E9E9]">
      <div className="w-full h-fit drop-shadow bg-white flex justify-center px-10 py-5 items-center">
        <div className="cursor-pointer flex flex-row justify-center items-center hover:opacity-80 my-5">
          <div className="bg-black p-3 rounded-[10px]">
            <FontAwesomeIcon icon={"download"} size="lg" color="white" />
          </div>
          <p
            className="font-semibold px-2 text-[20px]"
            onClick={() => {
              // navigate("/client.apk");
            }}
          >
            {translate("homepage", "download-apk")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
