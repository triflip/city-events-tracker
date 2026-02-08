import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-white shadow">
        <h1 className="text-xl font-bold">City Events Tracker</h1>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
