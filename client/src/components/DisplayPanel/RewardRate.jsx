import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Web3context from "../../context/Web3Context";
import { ethers } from "ethers";
import toast from "react-hot-toast";
const RewardRate = () => {
  const { selectedAccount,stakingContract } = useContext(Web3context);
  const [rewardRate, setRewardRate] = useState("0");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rateWei = await stakingContract.REWARD_RATE();
        const rate = ethers.formatUnits(rateWei.toString(), 18);
        // console.log(rate);
        setRewardRate(rate);
      } catch (error) {
        if(stakingContract!=null)
        toast.error("Could not fetch Reward rate");
      }
    };
    fetchData();
  }, [stakingContract,selectedAccount]);
  return <p>Reward rate: {rewardRate} Token/Second</p>;
};

export default RewardRate;
