import React, { useState } from 'react';

const ClaimRewards = ({ stakingContract, userAccount }) => {
  const [tokenAddress, setTokenAddress] = useState('');

  const handleClaimRewards = async () => {
    await stakingContract.getReward(tokenAddress);
  };

  return (
    <div>
      <h2>Claim Rewards</h2>
      <input type="text" placeholder="Token Address" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
      <button onClick={handleClaimRewards}>Claim Rewards</button>
    </div>
  );
};

export default ClaimRewards;
