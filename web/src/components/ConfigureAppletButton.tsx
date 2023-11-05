/**
 * ConfigureAppletProps defines the props for the ConfigureAppletButton component.
 * @interface ConfigureAppletProps
 */
type ConfigureAppletProps = {
  /**
   * The title text displayed on the button.
   */
  title: string;
  /**
   * Whether or not the applet is connected.
   */
  connected: boolean;
  /**
   * The function to be executed when the button is clicked.
   */
  redirect?: () => void;
};

/**
 * ConfigureAppletButton is a reusable button component used in applets.
 * It accepts a title, color, and onClick function as props.
 *
 * @component
 * @example
 * // Example usage of ConfigureAppletButton component
 * <ConfigureAppletButton
 *   title="Click me!"
 *   connected={true}
 *   redirect={() => {
 *     console.log("Button clicked!");
 *   }}
 * />
 *
 * @param {ConfigureAppletProps} props - The props for the ConfigureAppletButton component.
 * @returns {JSX.Element} - Returns the rendered ConfigureAppletButton component.
 */
export default function ConfigureAppletButton({
  title,
  connected,
  redirect,
}: ConfigureAppletProps) {
  return (
    <div className="w-[300px]">
      {!connected ? (
        <div
          className="bg-[#7A73E7] py-5 px-10 rounded-[20px] cursor-pointer hover:bg-[#7A73E7CC] my-10"
          onClick={() => {
            redirect ? redirect() : 0;
          }}
        >
          <p className="text-white font-semibold text-[28px] text-center">
            {title}
          </p>
        </div>
      ) : (
        <div className="bg-white py-5 px-10 rounded-[20px] border-4 border-[#7A73E7] cursor-not-allowed my-10">
          <p className="font-semibold text-[28px] text-center text-[#7A73E7]">
            {title}
          </p>
        </div>
      )}
    </div>
  );
}
