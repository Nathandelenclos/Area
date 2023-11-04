/**
 * AppletButtonProps defines the props for the AppletButton component.
 * @interface AppletButtonProps
 */
export type AppletButtonProps = {
  /**
   * The title text displayed on the button.
   */
  title: string;
  /**
   * The background color of the button.
   */
  color: string;
  /**
   * The function to be executed when the button is clicked.
   */
  onClick: () => void;
};

/**
 * AppletButton is a reusable button component used in applets.
 * It accepts a title, color, and onClick function as props.
 *
 * @component
 * @example
 * // Example usage of AppletButton component
 * <AppletButton
 *   title="Click me!"
 *   color="#3498db"
 *   onClick={() => {
 *     console.log("Button clicked!");
 *   }}
 * />
 *
 * @param {AppletButtonProps} props - The props for the AppletButton component.
 * @returns {JSX.Element} - Returns the rendered AppletButton component.
 */
export default function AppletButton({
  title,
  color,
  onClick,
}: AppletButtonProps) {
  return (
    <div
      onClick={onClick}
      className="flex w-full rounded-lg h-[100px] items-center justify-center mt-5 cursor-pointer"
      style={{ backgroundColor: color }}
    >
      <p className="text-white font-bold text-center text-xl px-5 text-ellipsis overflow-hidden">
        {title}
      </p>
    </div>
  );
}
