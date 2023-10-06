import React from "react";
import AuthViewContainer from "@components/AuthViewContainer";
import MainButton from "@components/MainButton";

export default function RecoverPassword() {
  return (
    <AuthViewContainer ContainerTitle={"Recover Password"}>
      <div className="flex flex-col justify-center items-center">
        <input
          className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded w-4/5 py-5 px-5 mt-4"
          type="text"
          placeholder="Email"
        />
        <MainButton
          title={"Recover"}
          onPress={() => {
            console.log("Recover");
          }}
        />
      </div>
    </AuthViewContainer>
  );
}
