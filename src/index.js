import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/scss/index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./providers/UserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UserProvider>
    <App />
    </UserProvider>
  </Router>
);
