import Navbar from "../components/ui/navbar"
import { useLoadEvents } from "../hooks/useLoadEvents"

export default function Home() {
  useLoadEvents()

  return (
    <div>
      <h1>Dashboard Home</h1>
      <p></p>
      <Navbar />
    </div>
  )
}
