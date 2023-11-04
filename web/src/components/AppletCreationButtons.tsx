import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Props for the AppletCreationButtons component.
 * @interface AppletCreationButtonsProps
 */
type AppletCreationButtonsProps = {
  /**
   * The title text displayed on the button.
   */
  title: string;
  /**
   * The FontAwesome icon displayed on the button.
   */
  icon?: IconName;
  /**
   * Whether or not the button is selected.
   */
  isSelected: boolean;
  /**
   * The function to be executed when the button is clicked.
   */
  onClick: (id: number) => void;
  /**
   * The ID of the button.
   */
  id: number;
};

/**
 * AppletCreationButtons is a reusable button component used in applet creation.
 * It accepts a title, color, and onClick function as props.
 *
 * @component
 * @example
 * // Example usage of AppletCreationButtons component
 * <AppletCreationButtons
 *   title="Click me!"
 *   icon="github"
 *   isSelected={true}
 *   onClick={() => {
 *     console.log("Button clicked!");
 *   }}
 *   id={1}
 * />
 *
 * @param {AppletCreationButtonsProps} props - The props for the AppletCreationButtons component.
 * @returns {JSX.Element} - Returns the rendered AppletCreationButtons component.
 */
export default function AppletCreationButtons({
  title,
  icon,
  isSelected,
  onClick,
  id,
}: AppletCreationButtonsProps) {
  return (
    <div
      className={`px-8 py-10 rounded-[20px] mb-5 ${
        isSelected ? "bg-[#38356C]" : "bg-[#7A73E7] hover:bg-[#7A73E7CC]"
      } cursor-pointer`}
      onClick={() => onClick(id)}
    >
      <div className="flex justify-evenly items-center w-full">
        {icon ? (
          <FontAwesomeIcon icon={["fab", icon]} size="2x" color="white" />
        ) : (
          <></>
        )}
        <h1 className="text-[27px] text-white font-semibold break-all w-4/6">
          {title}
        </h1>
      </div>
    </div>
  );
}
