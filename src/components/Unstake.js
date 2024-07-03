// src/components/Unstake.js

import React, { useState } from 'react';
const ethers = require('ethers');

const Unstake = ({ stakingContract, userAccount }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleUnstake = async () => {
    const amountInWei = ethers.utils.parseUnits(amount, 18);
    await stakingContract.unstake(tokenAddress, amountInWei);
  };

  return (
    <div>
      <h2>Unstake Tokens</h2>
      <input type="text" placeholder="Token Address" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button onClick={handleUnstake}>Unstake</button>
    </div>
  );
};

export default Unstake;
