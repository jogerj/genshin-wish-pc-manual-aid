import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

const container = document.getElementById("root");

const root = createRoot(container!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
