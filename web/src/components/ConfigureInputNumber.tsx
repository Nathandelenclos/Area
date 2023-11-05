/**
 * ConfigureAppletProps defines the props for the ConfigureAppletNumber component.
 * @interface ConfigureAppletProps
 */
type ConfigureAppletProps = {
  /**
   * The title text displayed on the button.
   */
  title: string;
  /**
   * The placeholder text displayed on the input field.
   */
  placeholderText: string;
  /**
   * The minimum number allowed in the input field.
   */
  minimunNumber: string;
};

/**
 * ConfigureAppletNumber is a reusable button component used in applets.
 * It accepts a title, a placeholder and a minimum number.
 *
 * @component
 * @example
 * // Example usage of ConfigureAppletNumber component
 * <ConfigureAppletNumber
 *   title="Delay in seconds"
 *   placeholderText="Delay in seconds"
 *   minimunNumber="0"
 * />
 *
 * @param {ConfigureAppletProps} props - The props for the ConfigureAppletNumber component.
 * @returns {JSX.Element} - Returns the rendered ConfigureAppletNumber component.
 */
export default function ConfigureAppletNumber({
  title,
  placeholderText,
  minimunNumber,
}: ConfigureAppletProps) {
  return (
    <div className="w-full">
      <p className="font-semibold text-[28px] text-center text-black">
        {title}
      </p>
      <input
        className="bg-[#D9D9D9CC] text-black placeholder-[#656565CC] rounded-[20px] border-2 py-4 px-5 placeholder:italic text-[20px] border-[#6F6F6F] my-7"
        type="number"
        min={minimunNumber}
        id="inputField"
        placeholder={placeholderText}
      />
    </div>
  );
}
