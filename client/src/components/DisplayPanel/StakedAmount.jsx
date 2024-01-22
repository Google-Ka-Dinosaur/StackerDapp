import React from "react";
import { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import Web3context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import toast from "react-hot-toast";
const StakedAmount = () => {
  const { selectedAccount,stakingContract} = useContext(Web3context);
  const [stakedAmount, setStakedAmount] = useState("0");
  const {isReload}=useContext(StakingContext);
  useEffect(() => {
    const fetchStakedBalance = async () => {
      try {
        // console.log(stakingContract);
        const amountStakedWei = await stakingContract.stakedBalance(selectedAccount);
        const amountStaked=ethers.formatUnits(amountStakedWei.toString(),18);
        const rounded=parseFloat(amountStaked).toFixed(2);
        // console.log(amountStaked);
        setStakedAmount(amountStaked);
      } catch (error) {
        if(stakingContract!=null)
        toast.error("Error fetching staked amount");
      }
    };
    fetchStakedBalance();
  }, [stakingContract,selectedAccount,isReload]);
  return <p>Staked Amount : {stakedAmount} STK</p>;
};

export default StakedAmount;
