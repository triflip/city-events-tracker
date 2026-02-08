import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export function useLoadEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error

        setEvents(data)
      } catch (err) {
        console.log("SUPABASE ERROR:", err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return { events, loading, error }
}
