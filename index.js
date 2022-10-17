import React from "react";
import App from "./App.js";
import { createRoot } from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.css";
// import store from "./src/components/redux/store";
// import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
