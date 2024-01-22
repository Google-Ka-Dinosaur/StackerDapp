import React from "react";
import ConnectedAccount from "./ConnectedAccount";
import ConnectedNetwork from "./ConnectedNetwork";

const Navigation = () => {
  return (
    <div className="absolute top-0 space-y-3 md:space-y-0 text-white font-bold text-lg  md:w-full flex flex-col md:flex-row justify-between px-3 py-5">
      <ConnectedAccount></ConnectedAccount>
      <ConnectedNetwork></ConnectedNetwork>
    </div>
  );
};

export default Navigation;
