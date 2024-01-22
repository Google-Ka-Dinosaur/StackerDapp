// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
contract Staking is ReentrancyGuard{
 using SafeMath for uint256;
 IERC20 public s_stakeToken;
 IERC20 public s_rewardToken;
 uint public constant REWARD_RATE=1e18;
 uint private totalStakedTokens;
 uint public rewardPerTokenStored;
 uint public lastUpdateTime;

mapping(address=>uint) public stakedBalance;
mapping(address=>uint) public rewards;
mapping(address=>uint) public userRewardsPerTokenPaid;


event staked(address indexed user,uint256 indexed amount);
event withdrawn(address indexed user,uint256 indexed amount);
event rewardClaimed(address indexed user,uint256 indexed amount);


constructor(address _stakeToken,address _rewardToken){
    s_stakeToken=IERC20(_stakeToken);
    s_rewardToken=IERC20(_rewardToken);
}

function rewardPerToken()public view returns(uint){
if(totalStakedTokens==0)
return rewardPerTokenStored;
uint time=block.timestamp.sub(lastUpdateTime);
uint totalRewards=REWARD_RATE.mul(time);
return rewardPerTokenStored.add(totalRewards.mul(1e18).div(totalStakedTokens));
}


function earned(address account)public view returns(uint){
    return( stakedBalance[account].mul(rewardPerToken().sub(userRewardsPerTokenPaid[account])).div(1e18).add(rewards[account]));
}

modifier updateReward(address account){
    rewardPerTokenStored=rewardPerToken();
    lastUpdateTime=block.timestamp;
    rewards[account]=earned(account);
    userRewardsPerTokenPaid[account]=rewardPerTokenStored;
    _;
}

function stake(uint amount)external nonReentrant updateReward(msg.sender){
    require(amount>0,"amount must be greater than 0");
    totalStakedTokens=totalStakedTokens.add(amount);
    stakedBalance[msg.sender]=stakedBalance[msg.sender].add(amount);
    emit staked(msg.sender, amount);
    bool success=s_stakeToken.transferFrom(msg.sender, address(this),amount);
    require(success,"Transfer Failed");
}

function withdraw(uint amount)external nonReentrant updateReward(msg.sender){
    require(amount>0,"amount must be greater than 0");
    require(amount<=stakedBalance[msg.sender],"Not enough balance");
    totalStakedTokens=totalStakedTokens.sub(amount);
    stakedBalance[msg.sender]=stakedBalance[msg.sender].sub(amount);
    emit withdrawn(msg.sender, amount);
    bool success=s_stakeToken.transfer(msg.sender,amount);
    require(success,"Withdrawal Failed");
}

function getReward()external nonReentrant updateReward(msg.sender){
    uint reward=rewards[msg.sender];
    require(reward>0,"No rewards to claim");
    rewards[msg.sender]=0;
    emit rewardClaimed(msg.sender, reward);
    bool success=s_rewardToken.transfer(msg.sender,reward);
    require(success,"Failed To Claim The reward");
}
}


//stakeToken:  0x99b536a7aB05F2a098b8d02DF58eDDB4f512F4D5
//RewardToken:   0xAe681476876A6Db14E765eA15CB4cEcB2B833069
//Staking:   0xe1BFe61E44c3D780b89d2e45f95f15C8F4af1514