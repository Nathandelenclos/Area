import React from "react";

export default function MainButton({
  title,
  reverse,
  onPress,
}: {
  title: string;
  reverse?: boolean;
  onPress: () => void;
}) {
  if (reverse) {
    return (
      <button
        className="bg-white hover:border-[#9490ce] text-[#7A73E7] hover:text-[#9490ce] text-2xl font-bold w-4/5 py-5 rounded mt-5 mb-10 border-4 border-[#7A73E7]"
        onClick={onPress}
      >
        {title}
      </button>
    );
  }
  return (
    <button
      className="bg-[#7A73E7] hover:bg-[#9490ce] text-white text-2xl font-bold w-4/5 py-5 rounded my-5"
      onClick={onPress}
    >
      {title}
    </button>
  );
}
