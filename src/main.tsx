import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
