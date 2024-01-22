import React from "react";
import { useContext } from "react";
import Web3Context from "../../context/Web3Context";
const ConnectedNetwork = () => {
  const { chainId } = useContext(Web3Context);
  if(chainId===null)
  return <div className='border-2 rounded-3xl py-1 px-4 hover:bg-green-200 cursor-pointer'>No network detected</div>;
  else if(chainId==11155111)
  return <div className='border-2 rounded-3xl py-1 px-4 hover:bg-green-200 cursor-pointer'>Sepolia Testnet</div>;
  else
  return <div className='border-2 rounded-3xl py-1 px-4 hover:bg-green-200 cursor-pointer'>Unsupported Network</div>
};

export default ConnectedNetwork;
