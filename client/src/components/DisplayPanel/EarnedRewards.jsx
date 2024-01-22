import React from "react";
import { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3context from "../../context/Web3Context";
import toast from "react-hot-toast";
const EarnedRewards = () => {
  const { selectedAccount, stakingContract } = useContext(Web3context);
  const [earned, setEarned] = useState("0");
  useEffect(() => {
    const fetchStakedBalance = async () => {
      try {
        // console.log(stakingContract);
        const earnedWei = await stakingContract.earned(selectedAccount);
        const earnedFormat = ethers.formatUnits(earnedWei.toString(), 18);
        const rounded = parseFloat(earnedFormat).toFixed(2);
        // console.log(earnedFormat);
        setEarned(rounded);
      } catch (error) {
        if(stakingContract!=null)
        toast.error("Error fetching earned rewards");
      }
    };
    stakingContract && fetchStakedBalance();
    const interval = setInterval(() => {
      stakingContract && fetchStakedBalance();
    }, 5000);
    return () => clearInterval(interval);
  }, [stakingContract, selectedAccount]);
  return <p>Earned Amount : {earned} RWT</p>;
};

export default EarnedRewards;
