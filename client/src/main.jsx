import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import { PropertyHandlingProvider } from "./context/PropertyHandlingContext";

import "./index.css";
import { ChatProvider } from "./context/ChatContext";


ReactDOM.render(
  <BrowserRouter>
    <AuthenticationProvider>
      <PropertyHandlingProvider>
        <TransactionsProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </TransactionsProvider>
      </PropertyHandlingProvider>
    </AuthenticationProvider>
  </BrowserRouter>
  ,
  document.getElementById("root"),
);
