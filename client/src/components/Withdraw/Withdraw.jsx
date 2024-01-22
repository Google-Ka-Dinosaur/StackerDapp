import React, { useState } from "react";
import { useContext, useEffect, useRef } from "react";
import Button from "../Button/Button";
import { ethers } from "ethers";
import Web3context from "../../context/Web3Context";
import StakingContext from "../../context/StakingContext";
import toast from "react-hot-toast";
const Withdraw = () => {
    const { stakingContract } = useContext(Web3context);
    const {isReload,setIsReload} = useContext(StakingContext);
    const withdrawTokenref = useRef();
    const withdrawToken = async (e) => {
      e.preventDefault();
      const amount = withdrawTokenref.current.value.trim();
      if (isNaN(amount) || amount <= 0) {
        toast.error("please enter a valid positive number");
          return;
        }
        const amountToWithdraw = ethers.parseUnits(amount, 18).toString();
        // console.log(amountToWithdraw);
      try {
        const transaction = await stakingContract.withdraw(
          amountToWithdraw
        );
        await toast.promise(transaction.wait(),{
          loading:"Transaction is pending",
          success:"Transaction was successful",
          error:"Transaction Failed"
        })
          withdrawTokenref.current.value="";
          setIsReload(!isReload);
      } catch (error) {
        toast.error("Token withdrawal Failed");
      }
    };
    return (
      <div>
        <form onSubmit={withdrawToken}>
          <input placeholder="Withdraw Amount" className="py-1 px-2 border-2 border-slate-300 rounded-md w-[94%] md:w-1/2 focus:outline-none" type="text" ref={withdrawTokenref}></input>
          <Button onClick={withdrawToken} type="submit" label="Withdraw" />
        </form>
      </div>
    );
};

export default Withdraw;
