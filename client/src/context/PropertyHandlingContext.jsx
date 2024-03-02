import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { chatURL, rentingURL } from "../utils/constants";
import { AuthenticationContext } from "./AuthenticationContext";
import { ethers } from "ethers";
import { TRANSACTION } from "../utils/messageType";
import { decodeToken } from "react-jwt";
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import hmacSHA512 from "crypto-js/hmac-sha512";
import {
  getEthereumContract,
  getNextMonthDate,
} from "../utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const PropertyHandlingContext = React.createContext();
const { ethereum } = window;

export const PropertyHandlingProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");

  const navigateTo = useNavigate();

  const { token } = useContext(AuthenticationContext);

  const config = {
    headers: {
      "auth-token": token(),
      "Content-Type": "multipart/form-data",
    },
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return toast("Please connect metamask");

      window.ethereum.on("accountsChanged", function (accounts) {
        setConnectedAccount(accounts[0]);
      });

      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length > 0) {
        setConnectedAccount(accounts[0]);
      } else {
        toast("Please log in to MetaMask");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error while trying to connect to ethereum account");
    }
  };

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
    if (!token()) {
      toast("You must be logged in");
      return;
    }
    const userId = decodeToken(token());
    const propertyContract = await getEthereumContract();
    const propertyId = await propertyContract.propertyCount();

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
      const response = await axios.post(`${rentingURL}/add`, formData, config);
      navigateTo("/manageProperties");
    } catch (error) {
      console.log(error.response);
      toast(error.response.data);
    }
  };

  const viewAllProperties = async () => {
    try {
      const response = await axios.get(`${rentingURL}/viewAll`);
      if (response.status == 200) {
        return response.data;
      } else {
        toast("Error");
        return;
      }
    } catch (error) {
      console.log(error.response);
      toast(error.response.data);
      return;
    }
  };

  const viewMyProperties = async () => {
    try {
      const response = await axios.get(
        `${rentingURL}/viewMyProperties`,
        config
      );
      if (response.status == 200) {
        return response.data;
      } else {
        toast("Error");
        return;
      }
    } catch (error) {
      console.log(error.response);
      toast(error.response.data);
      return;
    }
  };

  const viewProperty = async (id) => {
    try {
      const propertyContract = await getEthereumContract();
      const response = await axios.get(`${rentingURL}/view/${id}`);
      if (response.status != 200) {
        toast("Server Error");
        return;
      }

      const property = await propertyContract.properties(
        response.data[0].propertyIdOnBlockChain
      );

      const structuredProperty = {
        ...response.data[0],
        owner: property.owner,
        userId: property.userId,
      };

      return structuredProperty;
    } catch (error) {
      console.log(error.response);
      toast(error.response.data);
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
      toast(error);
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
      toast(error.response.data);
      return;
    }
  };

  const sendTransaction = async (chatId, message) => {
    try {
      const response = await axios.put(
        `${chatURL}/sendMessage`,
        { chatId: chatId, message: message, messageType: TRANSACTION },
        { headers: { "auth-token": token() } }
      );
      return response.data;
    } catch (error) {
      toast(error.response.data);
      console.log(error.response.data);
    }
  };

  const makePayment = async (property, chatId) => {
    try {
      if (!ethereum) return toast("Please connect metamask");

      const parsedPrice = ethers.utils.parseEther(`${property.price}`);

      const transactionHash = await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: property.owner,
            gas: "0x5208",
            value: parsedPrice._hex,
          },
        ],
      });
      const time = getNextMonthDate(new Date(property.paymentDate * 1000));
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
