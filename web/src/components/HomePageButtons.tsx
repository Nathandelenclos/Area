import React from "react";

type HomePageButtonProps = {
  Content: string;
};

export default function HomePageButton({ Content }: HomePageButtonProps) {
  return (
    <div className="rounded-[10px] mt-5 py-10 px-8 bg-[#7A73E7] hover:bg-[#7A73E7CC] cursor-pointer basis-[32%] mx-2 ">
      <p className="text-white font-semibold text-[23px] break-all">
        {Content}
      </p>
    </div>
  );
}
