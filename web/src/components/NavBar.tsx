import React from "react";

function NavBar() {
  return (
    <div className="w-full h-full drop-shadow bg-white flex justify-between px-10 py-5 align-center">
      <p className="text-[40px] font-extrabold">APP NAME</p>
      <div className="h-100 flex items-center flex-row">
        <div className="h-100 flex items-center flex-row px-10">
          <p className="font-semibold px-5 text-[32px]">Explore</p>
          <p className="font-semibold px-5 text-[32px]">Create</p>
          <p className="font-semibold px-5 text-[32px]">My Applets</p>
        </div>
        <p>Profile</p>
      </div>
    </div>
  );
}

export default NavBar;
