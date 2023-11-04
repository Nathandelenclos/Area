import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppContext from "@src/context/AppContextProvider";
import { useState } from "react";

/**
 * ProfileMainInfo component displays the main information of the user.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <ProfileMainInfo />
 *
 * @returns {JSX.Element} Rendered component.
 */
export default function ProfileMainInfo() {
  const { translate } = AppContext();
  const [password, setPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  /**
   * Set a new password when the user enters one.
   * @param str The new password to set.
   */
  const handleInputChange = (str: string) => {
    setNewPassword(str);
  };

  /**
   * Handles when the user clicks on the done button.
   * @param str The new password to set.
   */
  const handleCheckClick = (str: string) => {
    console.log("New password:", str);
    setNewPassword("");
  };

  return (
    <div
      className={
        "flex flex-col w-full h-auto items-center break-all md:break-normal"
      }
    >
      <div
        className={
          "flex flex-col w-10/12 md:flex-row lg:w-5/12 md:mx-10 h-auto items-center"
        }
      >
        <div className="flex flex-1 bg-[#7A73E7] justify-center md:mr-10 mr-0 rounded-[20px] py-10 px-10">
          <FontAwesomeIcon icon={"circle-user"} size="10x" color="white" />
        </div>
        <div className="flex flex-1 text-center flex-col h-auto space-y-5 md:text-left">
          <p className="text-[30px] font-semibold">Simon Riembault</p>
          <p className="text-[25px] md:break-normal break-all">
            simon.riembault@epitech.eu
          </p>
          {!password ? (
            <div
              className="min-w-fit h-auto bg-black hover:bg-[#000000CC] rounded-[20px] py-4 px-8 flex flex-row hover:cursor-pointer items-center justify-center"
              onClick={() => setPassword(!password)}
            >
              <p className="text-white font-bold mr-1 text-3xl">
                {translate("profile", "modify-password")}
              </p>
              <FontAwesomeIcon icon={"arrow-right"} size="2x" color="white" />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center">
              <input
                className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded-[10px] w-4/5 py-5 px-5"
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => {
                  handleInputChange(e.target.value);
                }}
              />
              <div className="flex flex-row items-center justify-center my-5 sm:my-0">
                <div
                  className="bg-[#7A73E7] hover:bg-[#7A73E7CC] flex justify-center items-center ml-2 p-4 rounded-[10px] cursor-pointer"
                  onClick={() => {
                    handleCheckClick(newPassword);
                    setPassword(!password);
                  }}
                >
                  <FontAwesomeIcon icon={"check"} size="2x" color="white" />
                </div>
                <div
                  className="bg-black hover:bg-[#000000CC] flex justify-center items-center ml-2 p-4 rounded-[10px] cursor-pointer"
                  onClick={() => {
                    setNewPassword("");
                    setPassword(!password);
                  }}
                >
                  <FontAwesomeIcon icon={"cancel"} size="2x" color="white" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
