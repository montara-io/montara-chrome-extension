import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// Create container for our React app
const container = document.createElement("div");
container.id = "montara-root";
document.body.appendChild(container);

// Create root and render app
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Add console log for debugging
console.log("Montara content script loaded");
