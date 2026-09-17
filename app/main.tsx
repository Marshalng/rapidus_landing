import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import HomeRoute from "./routes/_index";

import "./global.css";

document.title = "Rapidus";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomeRoute />
  </StrictMode>,
);
