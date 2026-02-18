import { useLoadEvents } from "../hooks/useLoadEvents";
import { deleteEventById } from "../lib/events";
import { useSearch } from "../hooks/useSearch";

import EventTable from "../components/events/EventTable";

export default function Home() {
  const { events, setEvents, loading, error } = useLoadEvents();
  const { filters } = useSearch();

  async function handleDelete(id) {
    if (!confirm("Segur que vols eliminar aquest esdeveniment?")) return;

    try {
      await deleteEventById(id);
      setEvents(prev => prev.filter(ev => ev.id !== id));
    } catch {
      alert("No s'ha pogut eliminar l'esdeveniment");
    }
  }

  if (loading) return <p className="p-6">Carregant...</p>;
  if (error) return <p className="p-6 text-red-600">Error carregant events</p>;

  // Aplicar filtres
  const filteredEvents = events.filter(event => {
    if (!filters.query) return true;

    const q = filters.query.toLowerCase();
    const fields = filters.fields || [];

    return fields.some(field => {
      const value = event[field];
      if (!value) return false;
      return String(value).toLowerCase().includes(q);
    });
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Llista d'esdeveniments</h1>

      <EventTable events={filteredEvents} onDelete={handleDelete} />
    </div>
  );
}
