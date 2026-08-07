import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css"; // <-- ADD THIS LINE BACK
import { initClarity } from "./utils/clarity.js";

// Initialize Microsoft Clarity recordings & heatmaps
initClarity();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);