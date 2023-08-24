# HomeBlocks - Smart Contract

Welcome to the smart_contract folder of HomeBlocks! This folder contains the Ethereum smart contract that governs the rental agreements. It ensures trust and transparency by automating the rental agreement execution and managing security deposits.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)

## Introduction

The smart_contract component of the HomeBlocks is responsible for automating the rental agreement process between property owners and tenants. It ensures that the terms of the agreement are executed transparently and securely on the Ethereum blockchain.

## Features

- Automated execution of rental agreements.
- Transparent and tamper-resistant agreements.


## Installation

To set up the smart contract locally, follow these steps:

1. **Clone the Repository**: `git clone https://github.com/abelaba/HomeBlocks.git`

2. **Navigate to the Smart Contract Folder**: `cd smart_contract`

3. **Install Dependencies**: Run `npm install` to install the required dependencies.

## Usage

1. **Set up blochain enviroment**: Either run `npx hardhat node` or install [Ganache](https://trufflesuite.com/ganache/) and run the application.

2. **Compile and Deploy**: Compile and deploy the smart contract onto the Ethereum blockchain Run `npx hardhat -network <network name> scripts/deploy.js`.

3. **Interact with the Smart Contract**: Use Ethereum wallets or development tools to interact with the deployed smart contract. Perform actions like creating agreements and making payments.

You can read more on using hardhat for deploying smart contracts using this link https://hardhat.org/hardhat-runner/docs/guides/deploying

## Technologies

- Smart Contract Language: Solidity
- Blockchain Platform: Ethereum
- Development Tools: Hardhat, Ganache
---

Feel free to explore the smart_contract folder and further enhance the functionality of the Ethereum smart contract. If you have any questions or need assistance, please don't hesitate to reach out. Happy coding!
