import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes/AppRoutes";
import "./index.css";
import { SearchProvider } from "./context/SearchProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchProvider>
      <AppRoutes />
    </SearchProvider>
  </React.StrictMode>,
);