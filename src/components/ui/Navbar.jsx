import { useState } from "react";
import { useSearch } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();

  const { setFilters } = useSearch();
  const [query, setQuery] = useState("");


  function handleSearch() {
    setFilters({
        query: query,
        fields: ["title", "description", "location"],
    });

    setIsSearchOpen(false);
    navigate("/events");
  }

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-2 border-b bg-white">
        <h1 className="text-xl font-bold">City Events</h1>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 rounded hover:bg-gray-100"
        >
          🔍
        </button>
      </nav>

      {isSearchOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded shadow-lg w-80">
      <h2 className="text-lg font-semibold mb-3">Cerca</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Escriu paraules clau..."
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setIsSearchOpen(false)}
          className="px-3 py-1 rounded border border-gray-300"
        >
          Cancel·lar
        </button>

        <button
          onClick={handleSearch}
          className="px-3 py-1 rounded bg-blue-600 text-white"
        >
          Cerca
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}
