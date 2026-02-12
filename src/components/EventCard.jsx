import Button from "./ui/Button";

export default function EventCard({ event }) {
  return (
    <div className="p-4 bg-white shadow rounded hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold">{event.title}</h3>

        <p className="text-gray-600 mt-1">{event.description}</p>

        {event.city && (
          <p className="text-sm text-gray-500 mt-2">{event.city}</p>
        )}

        <p className="text-sm text-gray-500 mt-1">
          {new Date(event.date).toLocaleString("ca-ES", {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <Button variant="primary" size="sm">
          Edit
        </Button>

        <Button variant="danger" size="sm">
          Delete
        </Button>
      </div>
    </div>
  );
}
