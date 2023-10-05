import React from "react";

function SignInMainComponent() {
  return (
    <div className="bg-white rounded-3xl absolute h-auto w-3/12 z-10">
      <h1 className="text-4xl font-bold my-10">Recover Password</h1>
      <div className="flex flex-col justify-center items-center">
        <input
          className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded w-4/5 py-5 px-5 mt-4"
          type="text"
          placeholder="Email"
        />
        <button className="bg-[#7A73E7] hover:bg-[#9490ce] text-white text-2xl font-bold w-4/5 py-5 rounded mt-10 mb-10">
          Recover
        </button>
      </div>
    </div>
  );
}

export default SignInMainComponent;
