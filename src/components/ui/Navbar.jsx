import { useState } from "react";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
            <h2 className="text-lg font-semibold mb-2">Modal de cerca</h2>
            <p>Això és un modal de prova.</p>

            <button
              onClick={() => setIsSearchOpen(false)}
              className="mt-4 px-3 py-1 bg-blue-600 text-white rounded"
            >
              Tancar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
