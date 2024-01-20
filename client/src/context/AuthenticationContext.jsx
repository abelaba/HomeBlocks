import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginURL, registerURL } from "../utils/constants";
import { decodeToken } from "react-jwt";

export const AuthenticationContext = React.createContext();

export const AuthenticationProvider = ({ children }) => {
  const navigateTo = useNavigate();

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const isWalletConnected = async () => {
    try {
      if (!window.ethereum) {
        return false;
      }
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });
      return accounts.length > 0;
    } catch (error) {
      throw new Error("Error while trying to connect to ethereum account");
    }
  };

  const register = async (e, name, email, password, etherAccount) => {
    e.preventDefault();
    try {
      const walletConnected = await isWalletConnected();
      if (!walletConnected) {
        alert("Please connect metamask");
        return;
      }
      const response = await axios.post(registerURL, {
        name: name,
        email: email,
        password: password,
        etherAccount: etherAccount,
      });
      navigateTo("/login");
    } catch (error) {
      alert(error.response.data);
      console.log(error.response.data);
    }
  };

  const login = async (e, email, password) => {
    e.preventDefault();
    try {
      const walletConnected = await isWalletConnected();
      if (!walletConnected) {
        alert("Please connect metamask");
        return;
      }
      const response = await axios.post(loginURL, {
        email: email,
        password: password,
      });

      sessionStorage.setItem("token", response.data);
      setToken(sessionStorage.getItem("token"));
      const userId = decodeToken(response.data);
      sessionStorage.setItem("userId", userId._id);
      setUserId(sessionStorage.getItem("token"));

      navigateTo("/");
    } catch (error) {
      alert(error.response.data);
      console.log(error.response.data);
    }
  };
  const logOut = () => {
    sessionStorage.clear();
    setToken(sessionStorage.getItem("token"));
    navigateTo("/login");
  };

  return (
    <AuthenticationContext.Provider
      value={{ register, login, token, logOut, userId }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
