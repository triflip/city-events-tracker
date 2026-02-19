export default function EventModal({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-9999">
      <div
        className="bg-white p-6 rounded shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        
        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>

        <p className="mb-2">
          <strong>Data:</strong> {event.start.toLocaleDateString()}
        </p>

        {event.description && (
          <p className="mt-2 text-gray-700">{event.description}</p>
        )}

        {event.image_url && (
  <img
    src={event.image_url}
    alt={event.title}
    className="mt-4 w-full rounded shadow"
  />
)}

      </div>
    </div>
  );
}
