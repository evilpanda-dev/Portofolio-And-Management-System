import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/scss/index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import UserProfileProvider from "./providers/UserProfileProvider";
import AlertProvider from "./providers/AlertProvider";
import UserCountProvider from "./providers/UserCountProvider";
import CommentCountProvider from "./providers/CommentCountProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <UserProvider>
      <UserProfileProvider>
        <AlertProvider>
          <UserCountProvider>
            <CommentCountProvider>
              <App />
            </CommentCountProvider>
          </UserCountProvider>
        </AlertProvider>
      </UserProfileProvider>
    </UserProvider>
  </Router>
);
