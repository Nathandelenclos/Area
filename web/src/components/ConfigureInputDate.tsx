/**
 * ConfigureAppletProps defines the props for the ConfigureAppletDate component.
 * @interface ConfigureAppletProps
 */
type ConfigureAppletProps = {
  /**
   * The title text displayed on the button.
   */
  title: string;
};

/**
 * ConfigureAppletDate is a reusable button component used in applets.
 * It accepts a title.
 *
 * @component
 * @example
 * // Example usage of ConfigureAppletDate component
 * <ConfigureAppletDate
 *   title="Click me!"
 * />
 *
 * @param {ConfigureAppletProps} props - The props for the ConfigureAppletDate component.
 * @returns {JSX.Element} - Returns the rendered ConfigureAppletDate component.
 */
export default function ConfigureAppletDate({ title }: ConfigureAppletProps) {
  return (
    <div className="w-full">
      <p className="font-semibold text-[28px] text-center text-black">
        {title}
      </p>
      <input
        className="bg-[#D9D9D9CC] text-black rounded-[20px] border-2 py-4 px-5 text-[20px] border-[#6F6F6F] my-7"
        type="date"
        id="inputField"
      />
    </div>
  );
}
