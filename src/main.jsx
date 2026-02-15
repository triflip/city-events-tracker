import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes/AppRoutes";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { SearchProvider } from "./context/SearchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchProvider>
      <AppRoutes />
    </SearchProvider>
  </React.StrictMode>,
);
