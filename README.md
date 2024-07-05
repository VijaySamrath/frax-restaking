Staking DApp
Overview
This Staking DApp is designed to enable users to stake their tokens, earn rewards, and manage their staking activities through an intuitive and user-friendly interface. Built with React and using the ethers.js library, it interacts with Ethereum smart contracts to provide decentralized finance functionalities. The application is deployed on the FraxTAL L2 Blockchain, providing faster transactions and lower fees.

Vision
The vision of this project is to create a seamless and efficient staking platform that allows users to easily manage their staking activities and earn rewards. By leveraging the power of blockchain and smart contracts, we aim to provide a transparent, secure, and user-friendly staking solution.

Problem Statement
In the rapidly growing field of decentralized finance (DeFi), staking has become a popular way for users to earn rewards by locking up their tokens. However, many existing staking platforms suffer from poor user interfaces, complex interactions, and lack of support for multiple tokens. This project aims to address these issues by providing:

User-friendly Interface: A clean, modern, and responsive UI that simplifies the staking process.
Multi-token Support: Allow users to stake various types of tokens by adding support for multiple tokens dynamically.

Security and Transparency: Ensure all interactions are secure and transparent through the use of fraxtal smart contracts.

Features
Connect Wallet: Connect your Ethereum wallet to the DApp to interact with the staking smart contract.

Add Supported Token: Add a new token that can be staked.

Stake Tokens: Stake your tokens for a specified duration (3, 6, or 12 months).
Unstake Tokens: Unstake your tokens and retrieve your staked amount.
Claim Rewards: Claim the rewards you have earned from staking.
Get Total Rewards: Retrieve the total rewards for a specified token.


Staking Contract Functionality
stToken: As users stake their own tokens, the staking contract ensures that users receive stToken for restaking purposes.
rewardToken: Users can claim rewardToken which is generated per minute.
Token Addresses
To view the tokens in MetaMask, import the following addresses:

stToken Address: 0x8c1b29CA3C4852EB49485a241dfe7097e66Ce712
Reward Token Address: 0x7499C49764294C04bB7745FDe9BE0AdAD3ABd62B

Deployment
This DApp is deployed on the FraxTAL L2 Blockchain, providing the benefits of faster transactions and lower fees.

Contributions
Contributions are welcome! Please fork the repository and create a pull request with your changes.

License
This project is licensed under the MIT License.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
