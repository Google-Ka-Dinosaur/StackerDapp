import React, { useState } from "react";
import { useContext, useEffect, useRef } from "react";
import Button from "../Button/Button";
import { ethers } from "ethers";
import Web3context from "../../context/Web3Context";
import toast from "react-hot-toast";
const TokenApproval = () => {
  const { stakingContract, stakeTokenContract } = useContext(Web3context);
  const approveTokenref = useRef();
  const approveToken = async (e) => {
    e.preventDefault();
    const amount = approveTokenref.current.value.trim();
    if (isNaN(amount) || amount <= 0) {
      toast.error("please enter a valid positive number");
      return;
    }
    const amountToSend = ethers.parseUnits(amount, 18).toString();
    try {
      const transaction = await stakeTokenContract.approve(
        stakingContract.target,
        amountToSend
      );
      await toast.promise(transaction.wait(),{
        loading:"Transaction is pending",
        success:"Transaction was successful",
        error:"Transaction Failed"
      })
        approveTokenref.current.value="";
        setIsReload(!isReload);
    } catch (error) {
      toast.error("Token Approval Failed");
    }
  };
  return (
    <div>
      <form onSubmit={approveToken}>
        <input placeholder="Token Approval" className=" py-1 px-2 border-2 border-slate-300 rounded-md w-[94%] md:w-1/2 focus:outline-none" type="text" ref={approveTokenref}></input>
        <Button onClick={approveToken} type="submit" label="Approve" />
      </form>
    </div>
  );
};

export default TokenApproval;
