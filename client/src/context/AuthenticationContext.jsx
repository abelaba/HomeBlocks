import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginURL, registerURL } from "../utils/constants";
import { decodeToken } from "react-jwt";

export const AuthenticationContext = React.createContext();

export const AuthenticationProvider = ({ children }) => {
  const navigateTo = useNavigate();

  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  const register = async (e, name, email, password, etherAccount) => {
    e.preventDefault();
    try {
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
