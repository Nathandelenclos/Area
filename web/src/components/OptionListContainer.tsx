import AppletCreationButtons from "./AppletCreationButtons";
import { IconName, IconProp } from "@fortawesome/fontawesome-svg-core";
import LoadingElement from "@components/LoadingElement";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type AppletServiceStruct = {
  id: number;
  title: string | JSX.Element;
  icon?: FontAwesomeIconProps;
  isClicked: boolean;
};

type OptionListContainerProps = {
  ContainerTitle: string;
  children?: AppletServiceStruct[];
  icon?: FontAwesomeIconProps;
  onListObjectClick?: (id: number, index: number) => void;
  onListDeleteClick?: (id: number, index: number) => void;
  loading?: boolean;
};

type AppleListProps = {
  childs: AppletServiceStruct[];
  onListObjectClick: (id: number, index: number) => void;
  onListDeleteClick?: (id: number, index: number) => void;
};

function AppletList({
  childs,
  onListObjectClick,
  onListDeleteClick,
}: AppleListProps) {
  return (
    <div className="max-h-[400px]">
      {childs.map((child, index) => (
        <AppletCreationButtons
          key={index}
          icon={child.icon}
          isSelected={child.isClicked}
          onClick={onListObjectClick}
          onListDeleteClick={onListDeleteClick}
          title={child.title}
          id={child.id}
          index={index}
        />
      ))}
    </div>
  );
}

export default function OptionListContainer({
  ContainerTitle,
  children,
  onListObjectClick,
  onListDeleteClick,
  loading,
}: OptionListContainerProps) {
  return (
    <div className="w-full flex flex-col">
      <h1 className="font-bold text-[30px] text-center my-10">
        {ContainerTitle}
      </h1>
      <div className="overflow-auto">
        {!loading ? (
          <AppletList
            childs={children ?? []}
            onListObjectClick={
              onListObjectClick
                ? onListObjectClick
                : () => {
                    return;
                  }
            }
            onListDeleteClick={onListDeleteClick}
          />
        ) : (
          <div className="flex justify-center">
            <LoadingElement />
          </div>
        )}
      </div>
    </div>
  );
}
