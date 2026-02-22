import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const { setFilters, clearFilters } = useSearch();

  function handleSearch() {
    setFilters({
      query,
      fields: ["title", "description", "location"],
    });
    setIsSearchOpen(false);
    setQuery("");
    navigate("/");
  }

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white font-semibold border-b-2 border-white pb-0.5"
      : "text-indigo-200 hover:text-white transition-colors";

  return (
    <>
      <nav className="flex items-center justify-end flex-1 h-full">
       <div className="flex items-center gap-16 font-medium bg-indigo-600 h-3/4 px-30 rounded-full ml-auto mr-6">
          <NavLink to="/" className={linkClass} onClick={clearFilters}>Home</NavLink>
          <NavLink to="/charts" className={linkClass}>Gràfics</NavLink>
          <NavLink to="/calendar" className={linkClass}>Calendari</NavLink>
          <NavLink to="/map" className={linkClass}>Mapa</NavLink>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-indigo-200 hover:text-white transition-colors text-lg"
          >
            🔍
          </button>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Cerca esdeveniments</h2>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Escriu paraules clau..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              autoFocus
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel·lar
              </button>
              <button
                onClick={handleSearch}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
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