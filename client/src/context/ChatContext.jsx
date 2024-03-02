import React, { useContext } from "react";
import axios from "axios";
import { PORT, chatURL, rentingURL } from "../utils/constants";
import { MESSAGE } from "../utils/messageType";
import { AuthenticationContext } from "./AuthenticationContext";
import { PropertyHandlingContext } from "./PropertyHandlingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
  const navigateTo = useNavigate();

  const { token } = useContext(AuthenticationContext);
  const { getEthereumContract } = useContext(PropertyHandlingContext);
  const config = {
    headers: {
      "auth-token": token(),
    },
  };

  const createChat = async (propertyOwnerUserId, propertyId) => {
    try {
      const response = await axios.post(
        `${chatURL}/createChat`,
        {
          propertyId: propertyId,
          user2Id: propertyOwnerUserId,
        },
        config
      );
      console.log(response.data);
      navigateTo(`/chats`);
      return response.data;
    } catch (error) {
      toast(error.response.data);
      console.log(error.response.data);
    }
  };

  const loadChats = async () => {
    try {
      const response = await axios.get(`${chatURL}/loadChats`, config);
      return response.data;
    } catch (error) {
      toast(error.response.data);
      console.log(error.response.data);
    }
  };
  const loadMessages = async (chatId) => {
    try {
      const response = await axios.get(
        `${chatURL}/loadMessages/${chatId}`,
        config
      );

      const response2 = await axios.get(
        `${rentingURL}/view/${response.data.propertyId}`
      );

      const propertyContract = await getEthereumContract();
      const blockChainResponse = await propertyContract.properties(
        response.data.propertyIdOnBlockChain
      );
      if (response2.status != 200) {
        toast("Server Error");
        return;
      }
      return {
        data: response.data,
        property: {
          ...blockChainResponse,
          _id: response2.data[0]._id,
        },
      };
    } catch (error) {
      toast(error.response);
      console.log(error);
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
      toast(error.response.data);
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
