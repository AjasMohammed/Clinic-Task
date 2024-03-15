import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CheckUser } from "./Store/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CheckUser>
      <App />
    </CheckUser>
  </React.StrictMode>
);
