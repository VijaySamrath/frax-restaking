
const ethers = require('ethers');
const getEthers = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return { provider, signer };
  } else {
    console.error("No Ethereum provider detected. Install MetaMask.");
    return null;
  }
};

export default getEthers;
