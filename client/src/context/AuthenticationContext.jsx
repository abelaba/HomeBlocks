import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginURL, registerURL } from "../utils/constants";
import { decodeToken } from "react-jwt";
import { toast } from 'react-toastify';

export const AuthenticationContext = React.createContext();

export const AuthenticationProvider = ({ children }) => {
  const navigateTo = useNavigate();

  const token = () => sessionStorage.getItem("token");
  const userId = () => sessionStorage.getItem("userId");

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
        toast("Please connect metamask");
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
      toast(error.response.data);
      console.log(error.response.data);
    }
  };

  const login = async (e, email, password) => {
    e.preventDefault();
    try {
      const walletConnected = await isWalletConnected();
      if (!walletConnected) {
        toast("Please connect metamask");
        return;
      }
      const response = await axios.post(loginURL, {
        email: email,
        password: password,
      });

      sessionStorage.setItem("token", response.data);
      const userId = decodeToken(response.data);
      sessionStorage.setItem("userId", userId._id);

      navigateTo("/");
    } catch (error) {
      toast(error.response.data);
      console.log(error.response.data);
    }
  };
  const logOut = () => {
    sessionStorage.clear();
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
