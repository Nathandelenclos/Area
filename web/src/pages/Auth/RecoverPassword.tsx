import React from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import MainButton from "@components/MainButton";
import AppContext from "@src/context/AppContextProvider";

export default function RecoverPassword() {
  const { translate } = AppContext();
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
