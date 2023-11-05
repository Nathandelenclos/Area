/**
 * ConfigureAppletProps defines the props for the ConfigureAppletField component.
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
};

/**
 * ConfigureAppletField is a reusable button component used in applets.
 * It accepts a title and a placeholder.
 *
 * @component
 * @example
 * // Example usage of ConfigureAppletDate component
 * <ConfigureAppletField
 *   title="Link to Youtube Channel"
 *   placeholderText="Channel link"
 * />
 *
 * @param {ConfigureAppletProps} props - The props for the ConfigureAppletField component.
 * @returns {JSX.Element} - Returns the rendered ConfigureAppletField component.
 */
export default function ConfigureAppletField({
  title,
  placeholderText,
}: ConfigureAppletProps) {
  return (
    <div className="w-full">
      <p className="font-semibold text-[28px] text-center text-black">
        {title}
      </p>
      <input
        className="bg-[#D9D9D9CC] text-black placeholder-[#656565CC] rounded-[20px] border-2 py-4 px-5 placeholder:italic text-[20px] border-[#6F6F6F] my-7"
        type="text"
        id="inputField"
        placeholder={placeholderText}
      />
    </div>
  );
}
