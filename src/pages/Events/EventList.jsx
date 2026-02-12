import { useLoadEvents } from "../../hooks/useLoadEvents";
import EventCard from "../../components/EventCard";

export default function EventList() {
  const { events, setEvents, loading, error } = useLoadEvents();

  if (loading) return <p>Carregant events...</p>;
  if (error) return <p>Error carregant events</p>;

  function handleDelete(id) {
  setEvents((prev) => prev.filter((event) => event.id !== id));
}


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Llista d' esdeveniments</h2>

      {events.length === 0 && <p>No hi ha esdeveniments disponibles.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
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
