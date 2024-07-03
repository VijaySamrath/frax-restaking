// src/components/Stake.js

import React, { useState } from 'react';
const ethers = require('ethers');
// import { ERC20_ABI } from '../abi/ERC20_ABI';

const Stake = ({ stakingContract, userAccount }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState(3);

  const handleStake = async () => {
    const tokenContract = new ethers.Contract(tokenAddress, stakingContract.signer);
    const amountInWei = ethers.utils.parseUnits(amount, 18);
    await tokenContract.approve(stakingContract.address, amountInWei);
    await stakingContract.stake(tokenAddress, amountInWei, duration);
  };

  return (
    <div>
      <h2>Stake Tokens</h2>
      <input type="text" placeholder="Token Address" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={duration} onChange={(e) => setDuration(e.target.value)}>
        <option value="3">3 Months</option>
        <option value="6">6 Months</option>
        <option value="12">12 Months</option>
      </select>
      <button onClick={handleStake}>Stake</button>
    </div>
  );
};

export default Stake;
