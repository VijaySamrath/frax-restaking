import React, { useState, useEffect, useContext } from "react";
import {
  RewardTokenAddress,
  RewardTokenABI,
  StakingContractAddress,
  StakingContractABI,
  stTokenAddress,
  stTokenABI,
} from "./constant";
import Web3Modal from "web3modal";

export const StakingContext = React.createContext();

const { ethers, BigNumber } = require("ethers");

const fetchRewardTokenContract = (signerOrProvider) =>
  new ethers.Contract(RewardTokenAddress, RewardTokenABI, signerOrProvider);

const fetchStakingContract = (signerOrProvider) =>
  new ethers.Contract(StakingContractAddress, StakingContractABI, signerOrProvider);

const fetchStTokenContract = (signerOrProvider) =>
  new ethers.Contract(stTokenAddress, stTokenABI, signerOrProvider);

const fetchContract = (address, abi, signerOrProvider) =>
  new ethers.Contract(address, abi, signerOrProvider);

export const StakingProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [stakingContract, setStakingContract] = useState(null);
  const [rewardTokenContract, setRewardTokenContract] = useState(null);
  const [stTokenContract, setStTokenContract] = useState(null);

    
    useEffect(() => {
      const initProvider = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        setProvider(provider);
        const signer = await provider.getSigner();
        setSigner(signer);
        const account = await signer.getAddress();
        setCurrentAccount(account);
        const stakingContract = fetchStakingContract(signer);
        setStakingContract(stakingContract);
        const rewardTokenContract = fetchRewardTokenContract(signer);
        setRewardTokenContract(rewardTokenContract);
        const stTokenContract = fetchStTokenContract(signer);
        setStTokenContract(stTokenContract);
      };
      initProvider();
    }, []);

    const addSupportedToken = async (tokenAddress) => {
      if (!stakingContract) return;
  
      try {
        const tx = await stakingContract.addSupportedToken(tokenAddress);
        await tx.wait();
        alert("Token added successfully!");
      } catch (error) {
        console.error("Error adding supported token:", error);
        alert(`Error adding supported token: ${error.message}`);
      }
    };
    
    // const stakeTokens = async (tokenAddress, amount, durationInMonths) => {
    //   if (!stakingContract) return;
    //   try {
    //     // const durationInSeconds = durationInMonths * 30 * 24 * 60 * 60; 
    //     const tx = await stakingContract.stake(tokenAddress, amount, durationInMonths);
    //     await tx.wait();
    //     alert("Staked successfully!");
    //   } catch (error) {
    //     console.error("Error staking tokens:", error);
    //     alert(`Error staking tokens: ${error.message}`);
    //   }
    // };
  
    const stakeTokens = async (tokenAddress, amount, duration) => {
      try {
        const tokenContract = fetchContract(tokenAddress, stTokenABI, signer);
  
        // Step 1: Approve the staking contract to spend tokens
        const approveTx = await tokenContract.approve(StakingContractAddress, amount);
        await approveTx.wait();
  
        // Step 2: Call the stake function on the staking contract
        const stakeTx = await stakingContract.stake(tokenAddress, amount, duration);
        await stakeTx.wait();
  
        alert("Tokens staked successfully!");
      } catch (error) {
        console.error("Error staking tokens:", error);
        alert(`Error staking tokens: ${error.message}`);
      }
    };
  
    const unstakeTokens = async (tokenAddress, amount) => {
      if (!stakingContract) return;
      try {
        const tx = await stakingContract.unstake(tokenAddress, amount);
        await tx.wait();
        alert("Unstaked successfully!");
      } catch (error) {
        console.error("Error unstaking tokens:", error);
        alert(`Error unstaking tokens: ${error.message}`);
      }
    };
  
    const claimRewards = async (tokenAddress) => {
      if (!stakingContract) return;
      try {
        const tx = await stakingContract.getReward(tokenAddress);
        await tx.wait();
        alert("Rewards claimed successfully!");
      } catch (error) {
        console.error("Error claiming rewards:", error);
        alert(`Error claiming rewards: ${error.message}`);
      }
    };
  
    const getTotalRewards = async (tokenAddress) => {
      if (!stakingContract || !currentAccount) return 0;
      try {
        const rewards = await stakingContract.calculateReward(currentAccount, tokenAddress);
        return ethers.formatUnits(rewards, 18);
      } catch (error) {
        console.error("Error fetching total rewards:", error);
        return 0;
      }
    };
  
    const getStakedBalance = async (tokenAddress) => {
      if (!stakingContract || !currentAccount) return 0;
      try {
        const balance = await stakingContract.stakedBalance(currentAccount, tokenAddress);
        return ethers.formatUnits(balance, 18);
      } catch (error) {
        console.error("Error fetching staked balance:", error);
        return 0;
      }
    };
  
    
    return (
      <StakingContext.Provider
        value={{
          currentAccount,
          addSupportedToken,
          stakeTokens,
          unstakeTokens,
          claimRewards,
          getTotalRewards,
          getStakedBalance,
        }}>
        {children}
      </StakingContext.Provider>
    );
  };