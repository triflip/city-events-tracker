import { useLoadEvents } from "../../hooks/useLoadEvents";
import EventCard from "../../components/EventCard";

export default function EventList() {
  const { events, loading, error } = useLoadEvents();

  if (loading) return <p>Carregant events...</p>;
  if (error) return <p>Error carregant events</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Llista d'Events</h2>

      {events.length === 0 && <p>No hi ha events disponibles.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
