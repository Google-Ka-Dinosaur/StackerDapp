import "./App.css";
import Wallet from "./components/Wallet/Wallet";
import Navigation from "./components/Navigation/Navigation";
import DisplayPanel from "./components/DisplayPanel/DisplayPanel";
import TokenApproval from "./components/StakeToken/TokenApproval";
import StakeAmount from "./components/StakeToken/StakeAmount";
import Withdraw from "./components/Withdraw/Withdraw";
import ClaimReward from "./components/ClaimReward/CaimReward";
import { StakingProvider } from "./context/StakingContext";
function App() {
  return (
    <>
      <Wallet>
        <Navigation></Navigation>
        <div className=" py-10 md:py-5 px-10 md:px-0 border-2 bg-slate-900 rounded-xl w-full md:w-1/2 h-{50vh} text-center justify-center">
          <StakingProvider>
            <DisplayPanel></DisplayPanel>
            <StakeAmount></StakeAmount>
            <Withdraw></Withdraw>
          </StakingProvider>
          <TokenApproval></TokenApproval>
          <ClaimReward></ClaimReward>
        </div>
      </Wallet>
    </>
  );
}

export default App;
