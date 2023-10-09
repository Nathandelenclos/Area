import React from "react";

export type AppletButtonProps = {
  title: string;
  color: string;
  onPress: () => void;
};

export default function AppletButton({
  title,
  color,
  onPress,
}: AppletButtonProps) {
  return (
    <div
      onClick={onPress}
      className="flex w-full rounded-lg h-[100px] items-center justify-center mt-5 cursor-pointer"
      style={{ backgroundColor: color }}
    >
      <p className="text-white font-bold text-center text-xl px-5 text-ellipsis overflow-hidden">
        {title}
      </p>
    </div>
  );
}
