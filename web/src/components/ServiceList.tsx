import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AuthItem } from "@interfaces/handle.auth";

type ServiceListProps = {
  title: string;
  list: AuthItem[];
  forceColor?: string;
};

export default function ServiceList({
  title,
  list,
  forceColor,
}: ServiceListProps) {
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
            style={{ backgroundColor: forceColor ?? service.color }}
            className={`w-24 h-24 m-4 flex items-center justify-center rounded-[20px] hover:opacity-50 cursor-pointer`}
          >
            <FontAwesomeIcon icon={service.icon} size="2x" color="white" />
          </div>
        ))}
      </div>
    </div>
  );
}
