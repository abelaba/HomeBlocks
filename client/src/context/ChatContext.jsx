import React, { useContext } from "react";
import axios from "axios";
import { PORT, chatURL } from "../utils/constants";
import { MESSAGE } from "../utils/messageType";
import { AuthenticationContext } from "./AuthenticationContext";
import { PropertyHandlingContext } from "./PropertyHandlingContext";
import { useNavigate } from "react-router-dom";

export const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const navigateTo = useNavigate();

  const { token } = useContext(AuthenticationContext);
  const { connectedAccount, getEthereumContract } = useContext(
    PropertyHandlingContext
  );
  const config = {
    headers: {
      "auth-token": token,
    },
  };

  const createChat = async (propertyOwnerUserId, propertyIdOnBlockChain) => {
    try {
      const response = await axios.post(
        `${chatURL}/createChat`,
        {
          propertyIdOnBlockChain: propertyIdOnBlockChain,
          user2Id: propertyOwnerUserId,
        },
        config
      );
      navigateTo(`/chat/${response.data._id}`);
      return response.data;
    } catch (error) {
      alert(error.response.data);
      console.log(error.response.data);
    }
  };

  const loadChats = async () => {
    try {
      const response = await axios.get(`${chatURL}/loadChats`, config);
      return response.data;
    } catch (error) {
      alert(error.response.data);
      console.log(error.response.data);
    }
  };
  const loadMessages = async (chatId) => {
    try {
      const response = await axios.get(
        `${chatURL}/loadMessages/${chatId}`,
        config
      );

      const propertyContract = await getEthereumContract();
      const property = await propertyContract.properties(
        response.data.propertyIdOnBlockChain
      );
      const structuredProperty = {
        owner: property.owner,
        userId: property.userId,
        name: property.name,
        description: property.description,
        address: property.propertyAddress,
        price: parseInt(property.price._hex),
        propertyCount: parseInt(property.propertyCount),
        propertyOwnershipHash: property.propertyOwnershipHash,
        available: property.available,
        timestamp: new Date(
          parseInt(property.timestamp._hex) * 1000
        ).toLocaleString(),
        tenant: property.tenant,
        paymentDate: parseInt(property.paymentDate._hex) / 1000,
        // rentalImage: response.data[0].rentalImage
      };
      return {
        data: response.data,
        property: structuredProperty,
      };
    } catch (error) {
      alert(error.response.data);
      console.log(error.response.data);
    }
  };

  const sendMessage = async (chatId, message) => {
    try {
      const response = await axios.put(
        `${chatURL}/sendMessage`,
        { chatId: chatId, message: message, messageType: MESSAGE },
        config
      );
      return response.data;
    } catch (error) {
      alert(error.response.data);
      console.log(error.response.data);
    }
  };

  return (
    <ChatContext.Provider
      value={{ loadChats, createChat, loadMessages, sendMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};
