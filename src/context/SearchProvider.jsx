import { useState } from "react";
import { SearchContext } from "./SearchContext";

export function SearchProvider({ children }) {
  const [filters, setFilters] = useState({
    query: "",
    fields: ["title", "description", "location"],
  });

  function clearFilters() {
    setFilters({
      query: "",
      fields: ["title", "description", "location"],
    });
  }

  return (
    <SearchContext.Provider value={{ filters, setFilters, clearFilters }}>
      {children}
    </SearchContext.Provider>
  );
}
