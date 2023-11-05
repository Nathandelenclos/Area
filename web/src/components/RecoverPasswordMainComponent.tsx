import React from "react";
import MainButton from "@components/MainButton";
import GlobalContext from "@src/context/GlobalContextProvider";

type RecoverPasswordMainComponentProps = {
  recover?: () => void;
};

export default function RecoverPasswordMainComponent({
  recover = () => {
    console.log("Recover");
  },
}: RecoverPasswordMainComponentProps) {
  const { translate } = GlobalContext();

  return (
    <div className="bg-white rounded-3xl absolute h-auto w-3/12 z-10">
      <h1 className="text-4xl font-bold my-10 text-center">
        {translate("login", "recoverPassword")}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <input
          className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded w-4/5 py-5 px-5 mt-4"
          type="text"
          placeholder="Email"
        />
        <MainButton title={"Recover"} onPress={recover} />
      </div>
    </div>
  );
}
