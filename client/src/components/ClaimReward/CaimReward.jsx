import React, { useState } from "react";
import { useContext, useEffect, useRef } from "react";
import Button from "../Button/Button";
import { ethers } from "ethers";
import Web3context from "../../context/Web3Context";
import toast from "react-hot-toast";
const ClaimReward = () => {
  const { stakingContract } = useContext(Web3context);
  const claimRewardToken = async (e) => {
    e.preventDefault();
    try {
      const transaction = await stakingContract.getReward();
      await toast.promise(transaction.wait(),{
        loading:"Transaction is pending",
        success:"Transaction was successful",
        error:"Transaction Failed"
      })
    } catch (error) {
      toast.error("Reward Claim Failed");
    }
  };
  return (
    <>
      <Button onClick={claimRewardToken} type="submit" label="Claim Reward" />
    </>
  );
};

export default ClaimReward;
