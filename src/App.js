// import React, { useContext, useState } from "react";
// import { StakingContext } from "./context/StakingContext";

// function App() {
//   const {
//     stakeTokens,
//     unstakeTokens,
//     claimRewards,
//     getTotalRewards,
//     addSupportedToken,
//     currentAccount,
//   } = useContext(StakingContext);

//   // Separate state variables for staking form
//   const [stakeTokenAddress, setStakeTokenAddress] = useState("");
//   const [stakeAmount, setStakeAmount] = useState("");
//   const [duration, setDuration] = useState("3");

//   // Separate state variables for unstaking form
//   const [unstakeTokenAddress, setUnstakeTokenAddress] = useState("");
//   const [unstakeAmount, setUnstakeAmount] = useState("");

//   // State variables for rewards form
//   const [rewardAddress, setRewardAddress] = useState("");
//   const [totalRewardsAddress, setTotalRewardsAddress] = useState("");
//   const [totalRewards, setTotalRewards] = useState("");

//   const handleStake = async () => {
//     await stakeTokens(stakeTokenAddress, stakeAmount, duration);
//   };

//   const handleUnstake = async () => {
//     await unstakeTokens(unstakeTokenAddress, unstakeAmount);
//   };

//   const handleClaimRewards = async () => {
//     await claimRewards(rewardAddress);
//   };

//   const handleGetTotalRewards = async () => {
//     const rewards = await getTotalRewards(totalRewardsAddress);
//     setTotalRewards(rewards);
//   };

//   const handleAddSupportedToken = async () => {
//     await addSupportedToken(stakeTokenAddress);
//   };

//   return (
//     <div>
//       <h1>Staking DApp</h1>
//       <p>Current Account: {currentAccount}</p>
      
//       <div>
//         <h2>Stake Tokens</h2>
//         <input
//           type="text"
//           placeholder="Token Address"
//           value={stakeTokenAddress}
//           onChange={(e) => setStakeTokenAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Amount"
//           value={stakeAmount}
//           onChange={(e) => setStakeAmount(e.target.value)}
//         />
//         <select value={duration} onChange={(e) => setDuration(e.target.value)}>
//           <option value="3">3 Months</option>
//           <option value="6">6 Months</option>
//           <option value="12">12 Months</option>
//         </select>
//         <button onClick={handleStake}>Stake Tokens</button>
//       </div>

//       <div>
//         <h2>Unstake Tokens</h2>
//         <input
//           type="text"
//           placeholder="Token Address"
//           value={unstakeTokenAddress}
//           onChange={(e) => setUnstakeTokenAddress(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Amount"
//           value={unstakeAmount}
//           onChange={(e) => setUnstakeAmount(e.target.value)}
//         />
//         <button onClick={handleUnstake}>Unstake Tokens</button>
//       </div>

//       <div>
//         <h2>Claim Rewards</h2>
//         <input
//           type="text"
//           placeholder="Reward Token Address"
//           value={rewardAddress}
//           onChange={(e) => setRewardAddress(e.target.value)}
//         />
//         <button onClick={handleClaimRewards}>Claim Rewards</button>
//       </div>

//       <div>
//         <h2>Get Total Rewards</h2>
//         <input
//           type="text"
//           placeholder="Token Address"
//           value={totalRewardsAddress}
//           onChange={(e) => setTotalRewardsAddress(e.target.value)}
//         />
//         <button onClick={handleGetTotalRewards}>Get Total Rewards</button>
//         <p>Total Rewards: {totalRewards}</p>
//       </div>

//       <div>
//         <h2>Add Supported Token</h2>
//         <input
//           type="text"
//           placeholder="New Token Address"
//           value={stakeTokenAddress}
//           onChange={(e) => setStakeTokenAddress(e.target.value)}
//         />
//         <button onClick={handleAddSupportedToken}>Add Supported Token</button>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useContext, useState } from "react";
import { StakingContext } from "./context/StakingContext";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";
import './App.css'; // Create a CSS file to style the app

function App() {
  const {
    stakeTokens,
    unstakeTokens,
    claimRewards,
    getTotalRewards,
    addSupportedToken,
    currentAccount,
  } = useContext(StakingContext);

  const [newTokenAddress, setNewTokenAddress] = useState("");
  const [stakeTokenAddress, setStakeTokenAddress] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [duration, setDuration] = useState("3");

  const [unstakeTokenAddress, setUnstakeTokenAddress] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");

  const [rewardAddress, setRewardAddress] = useState("");
  const [totalRewardsAddress, setTotalRewardsAddress] = useState("");
  const [totalRewards, setTotalRewards] = useState(null);

  const handleStake = async () => {
    await stakeTokens(stakeTokenAddress, stakeAmount, duration);
  };

  const handleUnstake = async () => {
    await unstakeTokens(unstakeTokenAddress, unstakeAmount);
  };

  const handleClaimRewards = async () => {
    await claimRewards(rewardAddress);
  };

  const handleGetTotalRewards = async () => {
    const rewards = await getTotalRewards(totalRewardsAddress);
    setTotalRewards(rewards.toString());
  };

  const handleAddSupportedToken = async () => {
    await addSupportedToken(newTokenAddress);
  };

  return (
    <Container maxWidth="lg" className="container">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center" className="header">
          Staking DApp
        </Typography>
        <Typography variant="body1" gutterBottom align="center" className="subheader">
          Connected Account: {currentAccount}
        </Typography>

        <Card className="card">
          <CardContent>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className="paper">
                  <Typography variant="h6" gutterBottom align="center" className="heading-add">
                    Add Supported Token
                  </Typography>
                  <TextField
                    label="New Token Address"
                    fullWidth
                    margin="normal"
                    value={newTokenAddress}
                    onChange={(e) => setNewTokenAddress(e.target.value)}
                    className="textfield"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddSupportedToken}
                    fullWidth
                  >
                    Add Supported Token
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className="paper">
                  <Typography variant="h6" gutterBottom align="center" className="heading-stake">
                    Stake Tokens
                  </Typography>
                  <TextField
                    label="Token Address"
                    fullWidth
                    margin="normal"
                    value={stakeTokenAddress}
                    onChange={(e) => setStakeTokenAddress(e.target.value)}
                    className="textfield"
                  />
                  <TextField
                    label="Amount"
                    fullWidth
                    margin="normal"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="textfield"
                  />
                  <Select
                    fullWidth
                    margin="normal"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="select"
                  >
                    <MenuItem value="3">3 Months</MenuItem>
                    <MenuItem value="6">6 Months</MenuItem>
                    <MenuItem value="12">12 Months</MenuItem>
                  </Select>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleStake}
                    fullWidth
                  >
                    Stake Tokens
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className="paper">
                  <Typography variant="h6" gutterBottom align="center" className="heading-unstake">
                    Unstake Tokens
                  </Typography>
                  <TextField
                    label="Token Address"
                    fullWidth
                    margin="normal"
                    value={unstakeTokenAddress}
                    onChange={(e) => setUnstakeTokenAddress(e.target.value)}
                    className="textfield"
                  />
                  <TextField
                    label="Amount"
                    fullWidth
                    margin="normal"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                    className="textfield"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUnstake}
                    fullWidth
                  >
                    Unstake Tokens
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className="paper">
                  <Typography variant="h6" gutterBottom align="center" className="heading-claim">
                    Claim Rewards
                  </Typography>
                  <TextField
                    label="Token Address"
                    fullWidth
                    margin="normal"
                    value={rewardAddress}
                    onChange={(e) => setRewardAddress(e.target.value)}
                    className="textfield"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClaimRewards}
                    fullWidth
                  >
                    Claim Rewards
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} className="paper">
                  <Typography variant="h6" gutterBottom align="center" className="heading-total-rewards">
                    Get Total Rewards
                  </Typography>
                  <TextField
                    label="Token Address"
                    fullWidth
                    margin="normal"
                    value={totalRewardsAddress}
                    onChange={(e) => setTotalRewardsAddress(e.target.value)}
                    className="textfield"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleGetTotalRewards}
                    fullWidth
                  >
                    Get Total Rewards
                  </Button>
                  {totalRewards !== null && (
                    <Box mt={2} className="rewards-box">
                      <Typography variant="body1" gutterBottom align="center">
                        Total Rewards: {totalRewards}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default App;
