import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IconName } from "@fortawesome/free-solid-svg-icons";

/**
 * Props for one of the ServiceListProps prop.
 * @interface ServiceListType
 */
type ServiceListType = {
  /**
   * Logo of the service.
   */
  logo: IconName;
  /**
   * Color of the button.
   */
  color: string;
};

/**
 * Props for the ServiceList component.
 * @interface ServiceListProps
 */
type ServiceListProps = {
  /**
   * Title of the list.
   */
  title: string;
  /**
   * List of the service in the component.
   */
  list: ServiceListType[];
};

/**
 * ServiceList component displays a list of services.
 *
 * @component
 * @example
 * // Usage example inside another component
 * <ServiceList
 *   title={translate("profile", "connected-services")}
 *   list={connectedServicesList}
 * />
 *
 * @param {ServiceListProps} props - list of every services offered.
 * @returns {JSX.Element} Rendered component.
 */
export default function ServiceList({ title, list }: ServiceListProps) {
  return (
    <div className={"flex flex-col w-full h-auto items-center mt-10"}>
      <p className={"text-[30px] font-semibold text-center"}>{title}</p>
      <div
        className={
          "flex w-full md:w-1/2 flex-row flex-wrap h-auto items-center justify-center mt-10"
        }
      >
        {list.map((service, index) => (
          <div
            key={index}
            style={{ backgroundColor: service.color }}
            className={`w-24 h-24 m-4 flex items-center justify-center rounded-[20px] hover:opacity-50 cursor-pointer`}
          >
            <FontAwesomeIcon
              icon={["fab", service.logo]}
              size="2x"
              color="white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
