import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [filters, setFilters] = useState({
    query: "",
    fields: ["title", "description", "location"],
  });

  return (
    <SearchContext.Provider value={{ filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
