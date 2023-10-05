import React from "react";
import ConnectionButtons from "@components/ConnectionButtons";
import OtherConnectionsOptionsSeparator from "@components/OtherConnectionOptionsSeparator";
import OtherConnectionsButtons from "@components/OtherConnectionsButtons";

function MainComponent() {
  return (
    <div className="bg-white rounded-3xl absolute h-auto w-3/12 z-10">
      <h1 className="text-4xl font-bold mt-20 mb-10">Welcome to App Name</h1>
      <ConnectionButtons />
      <OtherConnectionsOptionsSeparator />
      <OtherConnectionsButtons />
    </div>
  );
}

export default MainComponent;
