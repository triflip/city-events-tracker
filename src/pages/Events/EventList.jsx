import { useLoadEvents } from "../../hooks/useLoadEvents";
import EventCard from "../../components/EventCard";
import { useSearch } from "../../context/SearchContext";

export default function EventList() {
  const { events, setEvents, loading, error } = useLoadEvents();
  const { filters } = useSearch();

  if (loading) return <p>Carregant events...</p>;
  if (error) return <p>Error carregant events</p>;

  function handleDelete(id) {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }


  const filteredEvents = events.filter((event) => {
    if (!filters.query) return true;

    const q = filters.query.toLowerCase();
    const fields = filters.fields || [];

    return fields.some((field) => {
      const value = event[field];
      if (!value) return false;
      return String(value).toLowerCase().includes(q);
    });
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Llista d'esdeveniments</h2>

      {filteredEvents.length === 0 && (
        <p>No hi ha esdeveniments que coincideixin amb la cerca.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={handleDelete}
            
          />
        ))}
      </div>
    </div>
  );
}
