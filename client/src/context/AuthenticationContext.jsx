import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { PORT } from '../utils/constants';
import { decodeToken } from "react-jwt";


export const AuthenticationContext = React.createContext();




export const AuthenticationProvider = ({ children }) => {
    const navigateTo = useNavigate();

    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const [userId, setUserId] = useState(sessionStorage.getItem('userId'));

    const register = async (e, name, email, password, etherAccount) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:${PORT}/api/user/register`, {
                name: name,
                email: email,
                password: password,
                etherAccount: etherAccount
            });
            console.log(response.data);
            // setToken(response.data);
            navigateTo('/login');
        } catch (error) {
            alert(error.response.data)
            console.log(error.response.data);
        }

    }

    const login = async (e, email, password) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        try {
            const response = await axios.post(`http://localhost:${PORT}/api/user/login`, {
                email: email,
                password: password,
            });
            console.log(response.data);
            sessionStorage.setItem('token', response.data);
            setToken(sessionStorage.getItem('token'));
            const userId = decodeToken(response.data);
            sessionStorage.setItem('userId', userId._id);
            setUserId(sessionStorage.getItem('token'));

            navigateTo('/');
        } catch (error) {
            alert(error.response.data)
            console.log(error.response.data);
        }

    }
    const logOut = () => {
        sessionStorage.clear();
        setToken(sessionStorage.getItem('token'));
        navigateTo('/login');
    }

    const getUser = async (userId) => {
        console.log(userId);
        try {
            const response = await axios.get(`http://localhost:${PORT}/api/user/getUser/${userId}`, { headers: { "auth-token": token } });
            console.log(response.data);
            return response.data;
        } catch (error) {
            alert(error);
        }
    }

    return (
        <AuthenticationContext.Provider value={{ register, login, token, logOut, userId, getUser }}>
            {children}
        </AuthenticationContext.Provider>
    )

}