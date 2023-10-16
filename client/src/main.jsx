import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import { PropertyHandlingProvider } from "./context/PropertyHandlingContext";

import "./index.css";
import { ChatProvider } from "./context/ChatContext";

ReactDOM.render(
  <BrowserRouter>
    <AuthenticationProvider>
      <PropertyHandlingProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </PropertyHandlingProvider>
    </AuthenticationProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
