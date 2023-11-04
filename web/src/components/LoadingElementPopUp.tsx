import React from "react";

export default function LoadingElementPopUp() {
  return (
    <div className="bg-[#7A73E7] cursor-not-allowed text-white text-2xl font-bold w-4/5 py-5 rounded my-5 flex justify-center items-center">
      <div className="flex items-center justify-center border-[#7A73E7] border-4 border-t-white rounded-[30px] w-[30px] h-[30px] animate-spin"></div>
    </div>
  );
}
