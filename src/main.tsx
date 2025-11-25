
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/global.css";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { BrowserRouter } from 'react-router-dom';
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>    
    <AuthProvider>
      <BrowserRouter basename="/adventure-game">
        <App />
      </BrowserRouter>
    </AuthProvider>    
  </React.StrictMode>

  // <React.StrictMode>
  //   <BrowserRouter basename="/adventure-game">
  //     <App />
  //   </BrowserRouter>
  // </React.StrictMode>
);

