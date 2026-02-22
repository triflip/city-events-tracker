import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import logo_1 from "../assets/logo_1.png";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";

export default function MainLayout() {
  const navigate = useNavigate();
  const { clearFilters } = useSearch();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow flex items-center px-6 gap-6" style={{ height: "120px" }}>
        <button
          onClick={() => { clearFilters(); navigate("/"); }}
          className="h-full py-2 shrink-0"
        >
          <img
            src={logo_1}
            alt="City Event Tracker"
            className="h-full w-auto object-contain"
          />
        </button>

        <Navbar />
      </header>

      <main className="p-6 flex-1">
        <Outlet />
      </main>
    </div>
  );
}