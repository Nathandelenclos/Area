import AppletCreationButtons from "./AppletCreationButtons";
import { IconName } from "@fortawesome/fontawesome-svg-core";

/**
 * Props for the AppletService component.
 * @interface AppletServiceStruct
 */
type AppletServiceStruct = {
  /**
   * Id of the service.
   */
  id: number;
  /**
   * Title of the service.
   */
  title: string;
  /**
   * Logo of the service.
   */
  logo?: IconName;
  /**
   * If the service is clicked on.
   */
  isClicked: boolean;
};

/**
 * OptionListContainerProps defines the props for the OptionListContainer component.
 * @interface OptionListContainerProps
 */
type OptionListContainerProps = {
  ContainerTitle: string;
  children?: AppletServiceStruct[];
  onListObjectClick: (id: number) => void;
};

/**
 * AppleListProps defines the props for the AppletList component.
 * @interface AppleListProps
 */
type AppleListProps = {
  childs: AppletServiceStruct[];
  onListObjectClick: (id: number) => void;
};

/**
 * AppletList is a reusable list component used in applet creation.
 * It accepts a childs and onListObjectClick function as props.
 *
 * @component
 * @example
 * // Example usage of AppletList component
 * <AppletList
 *   childs={[]}
 *   onListObjectClick={() => {
 *     console.log("Button clicked!");
 *   }}
 * />
 *
 * @param {AppleListProps} props - The props for the AppletList component.
 * @returns {JSX.Element} - Returns the rendered AppletList component.
 */
function AppletList({ childs, onListObjectClick }: AppleListProps) {
  return (
    <div>
      {childs.map((child, index) => (
        <AppletCreationButtons
          key={index}
          icon={child?.logo ?? "cloud"}
          isSelected={child.isClicked}
          onClick={onListObjectClick}
          title={child.title}
          id={child.id}
        />
      ))}
    </div>
  );
}

/**
 * OptionListContainer is a reusable list container component used in applet creation.
 * It accepts a ContainerTitle, children, and onListObjectClick function as props.
 *
 * @component
 * @example
 * // Example usage of OptionListContainer component
 * <OptionListContainer
 *   ContainerTitle={translate(
 *     "create-applets",
 *     "supported-services-trigger",
 *   )}
 *   children={services.map((service: ServiceObject) => ({
 *     id: service.id,
 *     title: service.name,
 *     logo: "apple",
 *     isClicked: service.id === selectedServiceAction,
 *   }))}
 *   onListObjectClick={onServiceActionClick}
 * />
 *
 * @param {OptionListContainerProps} props - The props for the OptionListContainer component.
 * @returns {JSX.Element} - Returns the rendered OptionListContainer component.
 */
export default function OptionListContainer({
  ContainerTitle,
  children,
  onListObjectClick,
}: OptionListContainerProps) {
  return (
    <div className="w-full lg:mx-10 flex flex-col">
      <h1 className="font-bold text-[30px] text-center my-10">
        {ContainerTitle}
      </h1>
      <div className="overflow-y-scroll">
        <AppletList
          childs={children ?? []}
          onListObjectClick={onListObjectClick}
        />
      </div>
    </div>
  );
}
