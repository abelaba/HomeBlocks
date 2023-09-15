# HomeBlocks - Server

Welcome to the server folder of HomeBlocks! This folder contains the backend logic that handles user authentication, property listings, bookings, and communication between clients.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)

## Introduction

The server component of the Home Renting Application serves as the backend infrastructure for managing user accounts, property data, and bookings. It establishes communication between clients and the Ethereum smart contract to execute rental agreements and manage security deposits.

## Features

- User authentication and authorization.
- Property listing management.
- Booking requests handling.
- Messaging between property owners and tenants.


## Installation

To set up the server locally, follow these steps:

1. **Clone the Repository**: `git clone https://github.com/abelaba/HomeBlocks.git`

2. **Navigate to the Server Folder**: `cd server`

3. **Install Dependencies**: Run `npm install` to install the required dependencies.

4. **Configure Environment Variables**: Create a `.env` file and configure the necessary environment variables as given below.

```
DB_CONNECT = <MongoDB connection string>
SECRET_KEY = <Secret key for JWT>
PORT = <Port number for the server>
TEST_DB = <MongoDB connection string for testing>
```

## Usage

1. **Start the Server**: Run `nodemon app.js` to start the server.

2. **Interact with the API**: Use API clients like Postman to interact with the server endpoints for user authentication, property management, and booking requests.

3. **Run tests**: After adding the TEST_DB field in the .env file run `npm run test`.

## Technologies

- Backend Framework: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)

---

Feel free to explore the server folder and enhance the backend functionality. If you have any questions or need assistance, please don't hesitate to reach out. Happy coding!

