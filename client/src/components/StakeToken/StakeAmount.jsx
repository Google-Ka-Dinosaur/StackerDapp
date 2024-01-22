import React, { useState } from "react";
import { useContext, useEffect, useRef } from "react";
import Button from "../Button/Button";
import { ethers } from "ethers";
import Web3context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import toast from "react-hot-toast";
const StakeAmount = () => {
    const { stakingContract } = useContext(Web3context);
    const {isReload,setIsReload}=useContext(StakingContext);
    const stakeTokenref = useRef();
    const stakeToken = async (e) => {
      e.preventDefault();
      const amount = stakeTokenref.current.value.trim();
      if (isNaN(amount) || amount <= 0) {
        toast.error("please enter a valid positive number");
        return;
      }
      const amountToSend = ethers.parseUnits(amount, 18).toString();
      try {
        const transaction = await stakingContract.stake(
          amountToSend
        );
        await toast.promise(transaction.wait(),{
          loading:"Transaction is pending",
          success:"Transaction was successful",
          error:"Transaction Failed"
        })
          stakeTokenref.current.value="";
          setIsReload(!isReload);
      } catch (error) {
        toast.error("Token Staking Failed");
      }
    };
    return (
      <div>
        <form onSubmit={stakeToken}>
          <input placeholder="Stake Amount" className="py-1 px-2 border-2 border-slate-300 rounded-md w-[94%] md:w-1/2 focus:outline-none" type="text" ref={stakeTokenref}></input>
          <Button onClick={stakeToken} type="submit" label="Stake" />
        </form>
      </div>
    );
};

export default StakeAmount;
