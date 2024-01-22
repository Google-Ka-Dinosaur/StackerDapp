import React from 'react'
import { useContext } from 'react'
import Web3Context from "../../context/Web3Context";
const ConnectedAccount = () => {
  const {selectedAccount}=useContext(Web3Context);
  if(selectedAccount===undefined)
  return (
    <div className='border-2 rounded-3xl py-1 px-2 cursor-pointer hover:bg-red-400'>No Account Detected</div>
   )
  else
  return (
   <div className='border-2 rounded-3xl py-1 px-2 hover:bg-red-400 cursor-pointer'>{selectedAccount.substring(0,15)}...</div>
  )
}

export default ConnectedAccount