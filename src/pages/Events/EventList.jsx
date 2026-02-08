import { useLoadEvents } from "../../hooks/useLoadEvents"

export default function EventList() {
  const { events, loading, error } = useLoadEvents()

  if (loading) return <p>Carregant events...</p>
  if (error) return <p>Error carregant events</p>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Llista d'Events</h2>

      {events.length === 0 && (
        <p>No hi ha events disponibles.</p>
      )}

      <ul className="space-y-4">
        {events.map(event => (
          <li key={event.id} className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm text-gray-500">{event.location}</p>
            <p className="text-sm text-gray-500">
              Data: {event.date}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
