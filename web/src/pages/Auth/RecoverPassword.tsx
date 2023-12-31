import React from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import MainButton from "@components/MainButton";
import GlobalContext from "@src/context/GlobalContextProvider";

/**
 * RecoverPassword page displays the recover password page.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <RecoverPassword />
 *
 * @returns {JSX.Element} Rendered page.
 */
export default function RecoverPassword() {
  const { translate } = GlobalContext();
  return (
    <AuthViewContainer ContainerTitle={translate("login", "recoverPassword")}>
      <div className="flex flex-col justify-center items-center">
        <input
          className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded w-4/5 py-5 px-5 mt-4"
          type="text"
          placeholder={translate("login", "email")}
        />
        <MainButton
          title={translate("login", "recover")}
          onPress={() => {
            console.log("Recover");
          }}
        />
      </div>
    </AuthViewContainer>
  );
}
