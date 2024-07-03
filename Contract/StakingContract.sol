// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./stToken.sol";

contract Staking is ReentrancyGuard {
    using SafeMath for uint256;

    IERC20 public s_rewardToken;
    stToken public s_stToken;

    uint public constant SECONDS_IN_YEAR = 365 * 24 * 60 * 60;
    uint public constant SECONDS_IN_MONTH = 30 * 24 * 60 * 60;

    uint public constant APY_3_MONTHS = 5;
    uint public constant APY_6_MONTHS = 10;
    uint public constant APY_12_MONTHS = 20;

    mapping(address => bool) public isSupportedToken;
    mapping(address => mapping(address => uint256)) public stakedBalance;
    mapping(address => mapping(address => uint256)) public rewards;
    mapping(address => mapping(address => uint256)) public lastClaimTime;
    mapping(address => mapping(address => uint256)) public startTime; 
    mapping(address => mapping(address => uint256)) public stakingDuration; 

    address[] public supportedTokens;

    event Staked(address indexed user, address indexed token, uint256 amount, uint durationInSeconds);
    event Unstaked(address indexed user, address indexed token, uint256 amount);
    event RewardsClaimed(address indexed user, address indexed token, uint256 amount);

    constructor(address rewardToken, address _stToken) {
        s_rewardToken = IERC20(rewardToken);
        s_stToken = stToken(_stToken);
    }

    function addSupportedToken(address token) external {
        require(!isSupportedToken[token], "Token already supported");
        isSupportedToken[token] = true;
        supportedTokens.push(token);
    }

    function stake(address token, uint amount, uint durationInMonths) external nonReentrant {
        require(isSupportedToken[token], "Unsupported token");
        require(amount > 0, "Amount must be greater than zero");
        require(
            durationInMonths == 3 || durationInMonths == 6 || durationInMonths == 12,
            "Invalid staking duration"
        );

        uint durationInSeconds = durationInMonths * SECONDS_IN_MONTH;
        
        //Calculate and store previousRewards
        uint unclaimedReward = calculateReward(msg.sender, token);
        rewards[msg.sender][token] = rewards[msg.sender][token].add(unclaimedReward);

        // Update staked balance
        stakedBalance[msg.sender][token] = stakedBalance[msg.sender][token].add(amount);
        
        startTime[msg.sender][token] = block.timestamp;
        stakingDuration[msg.sender][token] = durationInSeconds;
        
        // Update last claim time
        lastClaimTime[msg.sender][token] = block.timestamp;

        emit Staked(msg.sender, token, amount, durationInSeconds);
        
        bool success = IERC20(token).transferFrom(msg.sender, address(this), amount);
        s_stToken.mint(msg.sender, amount.div(10**18));
        require(success, "Transfer Failed");
    }

    function calculateReward(address account, address token) public view returns (uint) {
        uint timeStaked = block.timestamp.sub(lastClaimTime[account][token]);
        uint duration = stakingDuration[account][token];

        uint apy;
        if (duration == 3 * SECONDS_IN_MONTH) {
            apy = APY_3_MONTHS;
        } else if (duration == 6 * SECONDS_IN_MONTH) {
            apy = APY_6_MONTHS;
        } else if (duration == 12 * SECONDS_IN_MONTH) {
            apy = APY_12_MONTHS;
        } else {
            apy = 0;
        }

        // Calculate reward rate per minute
        uint rewardRate = (apy.mul(1e18)).div(SECONDS_IN_YEAR).div(100).div(60);

        uint timeStakedInMinutes = timeStaked.div(60);
        return stakedBalance[account][token].mul(rewardRate).mul(timeStakedInMinutes).div(1e18);
    }

    function getReward(address token) external nonReentrant {
        require(isSupportedToken[token], "Unsupported token");
        uint reward = calculateReward(msg.sender, token);
        require(reward > 0, "No rewards to claim");

        // Update rewards mapping
        rewards[msg.sender][token] = 0;
        lastClaimTime[msg.sender][token] = block.timestamp;

        emit RewardsClaimed(msg.sender, token, reward);

        // Transfer reward tokens to user
        bool success = s_rewardToken.transfer(msg.sender, reward);
        require(success, "Transfer Failed");
    }

    function unstake(address token, uint amount) external nonReentrant {
        require(isSupportedToken[token], "Unsupported token");
        require(amount > 0, "Amount must be greater than zero");
        require(stakedBalance[msg.sender][token] >= amount, "Staked amount not enough");

        uint reward = calculateReward(msg.sender, token);
        rewards[msg.sender][token] = 0;
        lastClaimTime[msg.sender][token] = block.timestamp;
        emit RewardsClaimed(msg.sender, token, reward);
        bool successReward = s_rewardToken.transfer(msg.sender, reward);
        require(successReward, "Transfer Failed");

        stakedBalance[msg.sender][token] = stakedBalance[msg.sender][token].sub(amount);
        s_stToken.burnStTokens(msg.sender, amount.div(10**18));

        emit Unstaked(msg.sender, token, amount);
        
        bool success = IERC20(token).transfer(msg.sender, amount);
        require(success, "Transfer Failed");
    }

    function getUserStakedAmount(address user, address token) public view returns (uint) {
        return stakedBalance[user][token];
    }

    function getUserRewards(address user, address token) public view returns (uint) {
        return rewards[user][token].add(calculateReward(user, token));
    }

    function getUserStakingInfo(address user, address token) public view returns (uint, uint, uint) {
        return (
            stakedBalance[user][token],
            startTime[user][token],
            stakingDuration[user][token]
        );
    }
}
