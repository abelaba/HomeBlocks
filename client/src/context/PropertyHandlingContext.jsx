import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { PORT } from "../utils/constants";
import { AuthenticationContext } from "./AuthenticationContext";
import { ethers } from "ethers";
import { TRANSACTION } from "../utils/messageType";
import { decodeToken } from "react-jwt";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import hmacSHA512 from "crypto-js/hmac-sha512";
import moment from "moment";
import { getEthereumContract, getNextMonthDate } from "./helperFunctions";

export const PropertyHandlingContext = React.createContext();
const { ethereum } = window;

export const PropertyHandlingProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const URL = `http://localhost:${PORT}/api/rental`;

  const { token, getUser } = useContext(AuthenticationContext);

  const config = {
    headers: {
      "auth-token": token,
      "Content-Type": "multipart/form-data",
    },
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please connect metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      } else {
        alert("Please log in to MetaMask");
        console.log("No accounts");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum account");
    }
  };

  // Change account address when account is changed on MetaMask
  if (ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
      setConnectedAccount(accounts[0]);
    });
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const addProperty = async (
    name,
    description,
    address,
    coordinates,
    image,
    price,
    ownerShip,
    propertyType,
    numBedrooms,
    numBathrooms,
    totalArea
  ) => {
    const hashDigest = sha256(ownerShip);
    const propertyOwnershipHash = Base64.stringify(
      hmacSHA512(hashDigest, connectedAccount)
    );
    if (!token) {
      alert("You must be logged in");
      return;
    }
    const userId = decodeToken(token);
    const propertyContract = await getEthereumContract();
    const propertyId = await propertyContract.propertyCount();
    console.log(
      userId._id,
      name,
      description,
      address,
      price,
      propertyOwnershipHash
    );
    const addPropertyToBlockChain = await propertyContract.addProperty(
      userId._id,
      name,
      description,
      address,
      price,
      propertyOwnershipHash
    );
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("rentalImage", image);
    formData.append("ownerShip", ownerShip);
    formData.append("price", price);
    formData.append("coordinates", JSON.stringify(coordinates));
    formData.append("propertyType", propertyType); // Add property type
    formData.append("numBedrooms", numBedrooms); // Add number of bedrooms
    formData.append("numBathrooms", numBathrooms); // Add number of bathrooms
    formData.append("totalArea", totalArea); // Add total area
    formData.append("transactionHash", addPropertyToBlockChain.hash);
    formData.append("propertyIdOnBlockChain", propertyId);
    formData.append("propertyOwnershipHash", propertyOwnershipHash);

    try {
      const response = await axios.post(`${URL}/add`, formData, config);
      console.log(response);
    } catch (error) {
      console.log(error.response);
      alert(error.response.data);
    }
  };

  const viewAllProperties = async () => {
    try {
      var properties = [];
      const propertyContract = await getEthereumContract();
      const count = await propertyContract.propertyCount();
      for (let i = 0; i < parseInt(count._hex); i++) {
        const property = await propertyContract.properties(i);
        const response = await axios.get(`${URL}/getImage/${i}`);
        console.log(response);
        const timestamp = parseInt(property.timestamp._hex) * 1000;
        console.log(response);
        const structuredProperty = {
          owner: property.owner,
          userId: property.userId,
          name: property.name,
          description: property.description,
          address: response.data[0].address,
          price: parseInt(property.price._hex),
          propertyCount: parseInt(property.propertyCount._hex),
          propertyOwnershipHash: property.propertyOwnershipHash,
          available: response.data[0].available,
          timestamp: new Date(timestamp).toLocaleString(),
          rentalImage: response.data[0].rentalImage,
          tenant: property.tenant,
          numBedrooms: response.data[0].numBedrooms,
          numBathrooms: response.data[0].numBathrooms,
          totalArea: response.data[0].totalArea,
          coordinates: response.data[0].coordinates,
          propertyType: response.data[0].propertyType,
        };
        properties.push(structuredProperty);
      }
      return properties;
    } catch (error) {
      console.log(error.response);
      alert(error.response.data);
      return;
    }
  };

  const viewMyProperties = async () => {
    try {
      var properties = [];
      const propertyContract = await getEthereumContract();
      const count = await propertyContract.propertyCount();
      for (let i = 0; i < parseInt(count._hex); i++) {
        const property = await propertyContract.properties(i);
        console.log(property);
        if (parseInt(property.owner) == parseInt(connectedAccount)) {
          const response = await axios.get(`${URL}/getImage/${i}`);
          const timestamp = parseInt(property.timestamp._hex) * 1000;
          const structuredProperty = {
            owner: property.owner,
            userId: property.userId,
            name: property.name,
            description: property.description,
            address: response.data[0].address,
            price: parseInt(property.price._hex),
            propertyCount: parseInt(property.propertyCount._hex),
            propertyOwnershipHash: property.propertyOwnershipHash,
            available: response.data[0].available,
            timestamp: new Date(timestamp).toLocaleString(),
            rentalImage: response.data[0].rentalImage,
            tenant: property.tenant,
            numBedrooms: response.data[0].numBedrooms,
            numBathrooms: response.data[0].numBathrooms,
            totalArea: response.data[0].totalArea,
            coordinates: response.data[0].coordinates,
            propertyType: response.data[0].propertyType,
          };
          properties.push(structuredProperty);
        }
      }
      return properties;
    } catch (error) {
      console.log(error);
      alert(error);
      return [];
    }
  };

  const viewProperty = async (id) => {
    try {
      const propertyContract = await getEthereumContract();
      const property = await propertyContract.properties(id);
      const response = await axios.get(`${URL}/getImage/${id}`);
      const timestamp = parseInt(property.timestamp._hex) * 1000;
      const structuredProperty = {
        owner: property.owner,
        userId: property.userId,
        name: response.data[0].name,
        description: response.data[0].description,
        address: response.data[0].address,
        price: parseInt(property.price._hex),
        propertyCount: parseInt(property.propertyCount),
        propertyOwnershipHash: property.propertyOwnershipHash,
        available: response.data[0].available,
        timestamp: new Date(timestamp).toLocaleString(),
        rentalImage: response.data[0].rentalImage,
        tenant: property.tenant,
        numBedrooms: response.data[0].numBedrooms,
        numBathrooms: response.data[0].numBathrooms,
        totalArea: response.data[0].totalArea,
        coordinates: response.data[0].coordinates,
        propertyType: response.data[0].propertyType,
      };

      return structuredProperty;
    } catch (error) {
      console.log(error.response);
      alert(error.response.data);
      return;
    }
  };

  const acceptTenant = async (tenantAccount, propertyId) => {
    const time = getNextMonthDate(new Date().getTime());

    try {
      const propertyContract = await getEthereumContract();
      const property = await propertyContract.addTenant(
        propertyId,
        tenantAccount,
        time.format("X")
      );
      return property;
    } catch (error) {
      console.log(error);
      alert(error);
      return;
    }
  };
  const removeTenant = async (propertyId) => {
    try {
      const propertyContract = await getEthereumContract();
      const property = await propertyContract.removeTenant(propertyId);
      return property;
    } catch (error) {
      console.log(error.response);
      alert(error.response.data);
      return;
    }
  };

  const sendTransaction = async (chatId, message) => {
    try {
      const response = await axios.put(
        `http://localhost:${PORT}/api/chat/sendMessage`,
        { chatId: chatId, message: message, messageType: TRANSACTION },
        { headers: { "auth-token": token } }
      );
      return response.data;
    } catch (error) {
      alert(error.response.data);
      console.log(error.response.data);
    }
  };

  const makePayment = async (property, chatId) => {
    try {
      console.log(property);
      console.log(chatId);
      if (!ethereum) return alert("Please connect metamask");

      const parsedPrice = ethers.utils.parseEther(`${property.price}`);
      console.log(`Connected Account ${connectedAccount}`);
      console.log(`Owner Account ${property.owner}`);
      console.log(`Owner Account ${property.paymentDate}`);

      // const transactionHash = await ethereum.request({
      //   method: 'eth_sendTransaction',
      //   params:[{
      //       from: connectedAccount,
      //       to: property.owner,
      //       gas: "0x5208",
      //       value: parsedPrice._hex
      //     }]
      // });
      const time = getNextMonthDate(new Date(property.paymentDate * 1000));
      console.log(time);
      return;
      sendTransaction(chatId, transactionHash);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const getTransactionHistory = async (message) => {
    checkIfWalletIsConnected();
    const provider = new ethers.providers.Web3Provider(ethereum);
    const transaction = await provider.getTransaction(message);
    console.log(transaction);
    return transaction;
  };

  return (
    <PropertyHandlingContext.Provider
      value={{
        addProperty,
        viewMyProperties,
        viewProperty,
        viewAllProperties,
        acceptTenant,
        makePayment,
        getTransactionHistory,
        removeTenant,
        getEthereumContract,
        connectedAccount,
      }}
    >
      {children}
    </PropertyHandlingContext.Provider>
  );
};
