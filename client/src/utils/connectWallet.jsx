import { ethers, Contract } from "ethers";
import stakingAbi from "../abi/StakingAbi.json";
import stakeTokenAbi from "../abi/stakeTokenAbi.json";

export const connectWallet = async () => {
  try {
    let [signer, provider, stakingContract, stakeTokenContract, chainId] = [
      null,null,null,null,null
    ];
    if (window.ethereum === null) {
      throw new Error("Metamask is not installed");
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    let chainIdHex = await window.ethereum.request({
      method: "eth_chainId",
    });
    chainId = parseInt(chainIdHex, 16);
    let selectedAccount = accounts[0];
    if (!selectedAccount) {
      throw new Error("No ethereum account available");
    }
    provider = new ethers.BrowserProvider(window.ethereum);
    signer =await provider.getSigner();
    const stakingAddress = "0x984a6eD29044Fb5f3DD286cAd92790449BA62aC6";
    const stakeTokenAddress = "0x99b536a7aB05F2a098b8d02DF58eDDB4f512F4D5";
    stakingContract = new Contract(stakingAddress, stakingAbi, signer);
    stakeTokenContract = new Contract(stakeTokenAddress, stakeTokenAbi, signer);
    return {
      provider,
      selectedAccount,
      stakingContract,
      stakeTokenContract,
      chainId,
    };
  } catch (error) {
    throw error;
  }
};
