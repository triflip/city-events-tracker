import { useEffect, useState } from "react";
import { fetchEvents } from "../lib/events";

export function useLoadEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Error carregant events:", err);
        setError("No s'han pogut carregar els esdeveniments");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { events, setEvents, loading, error };
}
