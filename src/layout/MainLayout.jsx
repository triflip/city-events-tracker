import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="p-4 bg-white shadow">
        <Navbar />
      </header>

      <main className="p-6 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
