import React from "react";
import { Link } from "react-router-dom";

function SignInForms() {
  return (
    <div className="flex flex-col justify-center items-center mb-5">
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
      <Link
        to="/create-applet"
        className="bg-[#7A73E7] hover:bg-[#9490ce] text-white text-2xl font-bold w-4/5 py-5 rounded mt-10 mb-5"
      >
        <button>Sign in</button>
      </Link>
      <Link to="/sign-in/recover-password" className="text-[#7A73E7]">
        <p>Forgot password ?</p>
      </Link>
    </div>
  );
}

export default SignInForms;
