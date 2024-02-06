import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import { PropertyHandlingProvider } from "./context/PropertyHandlingContext";

import "./index.css";
import { ChatProvider } from "./context/ChatContext";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


ReactDOM.render(
  <BrowserRouter>
    <AuthenticationProvider>
      <PropertyHandlingProvider>
        <ChatProvider>
          <ToastContainer position="bottom-right" theme="dark"/>
          <App />
        </ChatProvider>
      </PropertyHandlingProvider>
    </AuthenticationProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
