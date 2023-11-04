import React from "react";
import MainButton from "@components/MainButton";
import AppContext from "@src/context/AppContextProvider";

/**
 * Props for the RecoverPasswordMainComponent component.
 * @interface RecoverPasswordMainComponentProps
 */
type RecoverPasswordMainComponentProps = {
  /**
   * Function that is executed when user wants to recover his password
   * @returns void
   */
  recover?: () => void;
};

/**
 * RecoverPasswordMainComponent component displays the recover password main component.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <RecoverPasswordMainComponent
 *  recover={
 *    console.log("Recover password");
 *  }
 * />
 *
 * @returns {JSX.Element} Rendered component.
 */
export default function RecoverPasswordMainComponent({
  recover = () => {
    console.log("Recover");
  },
}: RecoverPasswordMainComponentProps) {
  const { translate } = AppContext();

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
