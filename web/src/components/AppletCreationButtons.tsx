import { IconName, IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

type AppletCreationButtonsProps = {
  title: string | JSX.Element;
  icon?: FontAwesomeIconProps;
  isSelected: boolean;
  onClick: (id: number, index: number) => void;
  onListDeleteClick?: (id: number, index: number) => void;
  id: number;
  index: number;
};

export default function AppletCreationButtons({
  title,
  icon,
  isSelected,
  onClick,
  onListDeleteClick,
  id,
  index,
}: AppletCreationButtonsProps) {
  return (
    <div
      className={`px-8 py-10 rounded-[20px] mb-5 ${
        isSelected ? "bg-[#38356C]" : "bg-[#7A73E7] hover:bg-[#7A73E7CC]"
      } cursor-pointer`}
      onClick={() => onClick(id, index)}
    >
      <div className="flex justify-evenly items-center w-full">
        {icon ? <FontAwesomeIcon {...icon} /> : <></>}
        <h1 className="text-[27px] text-white font-semibold break-all w-4/6">
          {title}
        </h1>
        {onListDeleteClick ? (
          <FontAwesomeIcon
            icon="xmark"
            size="2x"
            color="white"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onListDeleteClick(id, index);
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
