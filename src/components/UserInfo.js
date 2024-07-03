// src/components/UserInfo.js

import React, { useState } from 'react';
const ethers = require('ethers');

const UserInfo = ({ stakingContract, userAccount }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleGetUserInfo = async () => {
    const stakedAmount = await stakingContract.getUserStakedAmount(userAccount, tokenAddress);
    const rewards = await stakingContract.getUserRewards(userAccount, tokenAddress);
    setUserInfo({ stakedAmount, rewards });
  };

  return (
    <div>
      <h2>User Info</h2>
      <input type="text" placeholder="Token Address" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
      <button onClick={handleGetUserInfo}>Get User Info</button>
      {userInfo && (
        <div>
          <p>Staked Amount: {ethers.utils.formatUnits(userInfo.stakedAmount, 18)}</p>
          <p>Rewards: {ethers.utils.formatUnits(userInfo.rewards, 18)}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
