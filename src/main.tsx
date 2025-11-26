
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/global.css";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";
import { BrowserRouter } from 'react-router-dom';
import React from "react";
 
const basePath = import.meta.env.VITE_FRONTEND_SUBPATH || '/'; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>    
    <AuthProvider>
      <BrowserRouter basename={basePath}>
        <App />
      </BrowserRouter>
    </AuthProvider>    
  </React.StrictMode>
);

