import React from "react";
import EarnedRewards from "./EarnedRewards";
import RewardRate from "./RewardRate";
import StakedAmount from "./StakedAmount";
const DisplayPanel = () => {
  return (
    <div className="text-white italic font-extrabold text-sm md:text-xl mb-5">
      <StakedAmount></StakedAmount>
      <RewardRate></RewardRate>
      <EarnedRewards></EarnedRewards>
    </div>
  );
};

export default DisplayPanel;
