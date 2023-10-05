import React from "react";

function SignUpForms() {
  return (
    <div className="flex flex-col justify-center items-center">
      <input
        className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded w-4/5 py-5 px-5 mt-4"
        type="text"
        placeholder="Full Name"
      />
      <input
        className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded w-4/5 py-5 px-5 mt-4"
        type="text"
        placeholder="Email"
      />
      <input
        className="bg-[#F0F0F0] placeholder-[#CBCBCB] focus:outline-none focus:border-none rounded w-4/5 py-5 px-5 mt-5"
        type="password"
        placeholder="Password"
      />
      <button className="bg-[#7A73E7] hover:bg-[#9490ce] text-white text-2xl font-bold w-4/5 py-5 rounded mt-10 mb-5">
        Sign up
      </button>
      <p className="w-3/5 mb-5">
        By creating an account you accept our{" "}
        <a className="text-[#7A73E7]">Terms of services</a> and{" "}
        <a className="text-[#7A73E7]">Privacy policy</a>.
      </p>
    </div>
  );
}

export default SignUpForms;
