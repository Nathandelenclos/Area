import React from "react";
import GlobalContext from "@src/context/GlobalContextProvider";

/**
 * Props for the AppletCreationInputName component.
 * @interface AppletCreationInputNameProps
 */
interface AppletCreationInputNameProps {
  /**
   * The value of the input.
   */
  value: string;
  /**
   * The function to be executed when the input value changes.
   */
  onChange: (value: string) => void;
}

/**
 * AppletCreationInputName component displays the input for the applet name.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <AppletCreationInputName
 *   value={name}
 *   onChange={(value) => setName(value)}
 * />
 *
 * @param {AppletCreationInputNameProps} props - The properties of the component.
 * @returns {JSX.Element} Rendered component.
 */
export default function AppletCreationInputName({
  value,
  onChange,
}: AppletCreationInputNameProps) {
  const { translate } = GlobalContext();
  return (
    <div className="bg-[#7A73E7] pl-10 mt-5 lg:px-8 py-10 rounded-[20px] h-max">
      <div className="flex justify-evenly items-center w-full">
        <input
          type="text"
          placeholder={translate("create-applets", "input-applet-placeholder")}
          className="w-full border-0 bg-[#7A73E7] text-white text-[28px] focus:outline-none placeholder-[#FFFFFF99] font-semibold"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}
