import { useEffect, useState } from "react";
import { getEventById } from "../lib/events";

export function useEvent(id) {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

    useEffect(() => {
        async function load() {
            try {
                const data = await getEventById(id);
                setEvent(data);
            } catch (err) {
                console.error("Error loading event:", err);
                setError("No s'ha pogut carregar l'esdeveniment");
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    return { event, loading, error };
}