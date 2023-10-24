import AppletCreationButtons from "./AppletCreationButtons";
import { IconName } from "@fortawesome/fontawesome-svg-core";

type AppletServiceStruct = {
  id: number;
  title: string;
  logo?: IconName;
  isClicked: boolean;
};

type OptionListContainerProps = {
  ContainerTitle: string;
  children?: AppletServiceStruct[];
  onListObjectClick: (id: number) => void;
};

type AppleListProps = {
  childs: AppletServiceStruct[];
  onListObjectClick: (id: number) => void;
};

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
