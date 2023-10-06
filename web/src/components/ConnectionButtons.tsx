import React from "react";
import MainButton from "@components/MainButton";

export default function ConnectionButtons() {
  const NavigateToSignIn = () => {
    window.location.href = "/sign-in";
  };

  const NavigateToSignUp = () => {
    window.location.href = "/sign-up";
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <MainButton title={"Sign In"} onPress={NavigateToSignIn} />
      <MainButton title={"Sign Up"} reverse={true} onPress={NavigateToSignUp} />
    </div>
  );
}
