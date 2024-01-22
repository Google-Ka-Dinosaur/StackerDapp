import { Children, useEffect, useState } from "react";
import { connectWallet } from "../../utils/connectWallet";
import Web3context from "../../context/Web3Context";
import Button from "../Button/Button";
import { handleAccountChange } from "../../utils/handleAccountChange";
import { handleChainChange } from "../../utils/handleChainChange";
import toast from "react-hot-toast";
const Wallet = ({children}) => {
  const [state, setState] = useState({
    provider: null,
    account: null,
    stakingContract: null,
    stakeTokenContract: null,
    chainId: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.ethereum.on('accountsChanged',()=>handleAccountChange(setState));
    window.ethereum.on('chainChanged',()=>handleChainChange(setState));
    return ()=>{
      window.ethereum.removeListener('accountsChanged',()=>handleAccountChange(setState));
    window.ethereum.removeListener('chainChanged',()=>handleChainChange(setState));
    }
  }, []);
  const handleWallet = async () => {
    try {
      setIsLoading(false);
      const {
        provider,
        selectedAccount,
        stakingContract,
        stakeTokenContract,
        chainId,
      } = await connectWallet();
      setState({
        provider,
        selectedAccount,
        stakingContract,
        stakeTokenContract,
        chainId,
      });
      setIsLoading(false);
    } catch (e) {
      toast.error("Error Connecting Wallet");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Web3context.Provider value={state}>{children}</Web3context.Provider>
      {isLoading && <p>Loading...</p>}
      {state.account===null&&<Button onClick={handleWallet} label={"Connect Wallet"} />}
    </>
  );
};

export default Wallet;
