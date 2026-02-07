import { useLoadEvents } from "../hooks/useLoadEvents"

export default function Home() {
  useLoadEvents()

  return (
    <div>
      <h1>Dashboard Home</h1>
      <p>Mira la consola per veure els events carregats de Supabase.</p>
    </div>
  )
}
