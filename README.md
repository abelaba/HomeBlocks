# HomeBlocks Repository

Welcome to the HomeBlocks repository! This repository contains the codebase for a comprehensive home renting application, comprising client, server, and smart contract components. This application aims to simplify and streamline the process of renting and managing properties.

![alt text](image.png)


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Setup](#setup)
- [Usage](#usage)
- [Technologies](#technologies)

## Introduction

The Home Renting Application is a platform that connects property owners and tenants, making the home renting process efficient and transparent. The application consists of three main components:

1. **Client**: This folder contains the frontend code for the application. It provides an intuitive user interface for both property owners and tenants to interact with the platform.

2. **Server**: The server folder houses the backend logic of the application. It handles user authentication, property listings, bookings, and communication between clients and the smart contract.

3. **Smart Contract**: The smart_contract folder contains the Ethereum smart contract that governs the rental agreements. It ensures trust and transparency by automating the rental agreement execution and managing security deposits.

## Features

- User registration and authentication for both property owners and tenants.
- Property owners can list their properties, complete with details and images.
- Tenants can search for properties based on location, price range, and amenities.
- Ethereum smart contract ensures secure and automated execution of rental agreements.
- Rental payment through the smart contract.
- Real-time messaging between property owners and tenants.
- User-friendly interface for a seamless experience.

## Folder Structure

The repository follows a structured organization for easy navigation:

```
HomeBlocks/
├── client/
│ ├── src/
│ └── README.md
├── server/
│ ├── routes/
│ ├── model/
│ └── README.md
├── smart_contract/
│ ├── contracts/
│ ├── scripts/
│ └── README.md
└── README.md
```

## Setup

Follow these instructions to set up the Home Renting Application locally:

1. **Clone the Repository**: `git clone https://github.com/abelaba/HomeBlocks.git`

2. **Client Setup**: Navigate to the `client` folder and follow the instructions in the client's README.md to set up the frontend.

3. **Server Setup**: Navigate to the `server` folder and follow the instructions in the server's README.md to set up the backend.

4. **Smart Contract Setup**: Navigate to the `smart_contract` folder and follow the instructions in the smart_contract's README.md to deploy and interact with the Ethereum smart contract.

## Usage

- Property owners can register, list properties.
- Tenants can register, search for properties, and request bookings.
- Smart contract automates rental agreements and rental payment.
- Real-time messaging facilitates communication between users.

## Technologies

- Frontend: HTML, CSS, React
- Backend: Node.js, Express.js
- Smart Contract: Solidity, Ethereum
- Database: MongoDB


---

Feel free to explore the folders and get started with the Home Renting Application. If you have any questions or need assistance, please don't hesitate to reach out. Happy renting!
