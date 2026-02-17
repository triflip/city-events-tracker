import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const { setFilters } = useSearch();

  function handleSearch() {
    setFilters({
      query,
      fields: ["title", "description", "location"],
    });

    setIsSearchOpen(false);
    navigate("/events");
  }

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
        
        {/* LEFT: LOGO */}
        <h1 
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          City Events
        </h1>

        {/* CENTER: LINKS */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
          <NavLink to="/events" className="hover:text-blue-600">Events</NavLink>
          <NavLink to="/charts" className="hover:text-blue-600">Gràfics</NavLink>
          <NavLink to="/calendar" className="hover:text-blue-600">Calendari</NavLink>
          <NavLink to="/map" className="hover:text-blue-600">Mapa</NavLink>
        </div>

        {/* RIGHT: SEARCH BUTTON */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 rounded hover:bg-gray-100"
        >
          🔍
        </button>
      </nav>

      {/* SEARCH MODAL */}
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
