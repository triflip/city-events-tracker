import { useEffect } from "react";  
import { supabase } from "../lib/supabaseClient";

export function useLoadEvents() {
    useEffect(() => {
        async function fetchEvents() {
            const { data, error } = await supabase
            .from("events")
            .select("*")
            .order("created_at", { ascending: false })

            console.log("Supabase events → data:", data)
            console.log("Supabase events → error:", error)
            
        }

        fetchEvents()
    }, [] )
}