import background from "@assets/vectorBackground.jpg";
import React from "react";

export default function AuthViewContainer({
  ContainerTitle,
  children,
}: {
  ContainerTitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden w-full h-full flex items-center justify-center">
      <img
        src={background}
        alt="background"
        className="w-full h-screen object-cover z-0"
      />
      <div className="bg-white rounded-3xl absolute h-auto w-3/12 z-10">
        <h1 className="text-4xl font-bold my-10 text-center">
          {ContainerTitle}
        </h1>
        {children}
      </div>
    </div>
  );
}
