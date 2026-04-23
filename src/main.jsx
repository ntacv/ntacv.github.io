import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/app.css";

if (window.location.pathname !== "/" && !window.location.hash) {
  const route = window.location.pathname + window.location.search;
  window.history.replaceState(null, "", "/#" + route);
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root container not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
