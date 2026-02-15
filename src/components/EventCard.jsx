import { supabase } from "../lib/supabaseClient";
import Button from "./ui/Button";

export default function EventCard({ event, onDelete }) {
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Segur que vols eliminar aquest esdeveniment?",
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("events").delete().eq("id", event.id);

    if (error) {
      console.error("Error eliminant:", error);
      return;
    }

    onDelete(event.id);
  }

  const d = new Date(event.date);
  const formattedDate = d.toLocaleDateString("ca-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = d.toLocaleTimeString("ca-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4 bg-white shadow rounded-xl hover:shadow-lg transition 
    flex flex-col sm:flex-row items-stretch gap-4 
    min-h-40 w-full border border-gray-100">

      {/* TEXT */}
      <div className="flex-1 flex flex-col justify-between order-2 sm:order-1">
        <div>
          <h3 className="text-xl font-bold text-gray-800 leading-tight">
            {event.title}
          </h3>

          <p className="text-gray-600 mt-2 line-clamp-2">
            {event.description}
          </p>

          {event.location && (
            <p className="text-sm text-gray-500 mt-2 whitespace-pre-line bg-gray-50 p-2 rounded">
              {event.location}
            </p>
          )}
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            {formattedDate} — {formattedTime}h
          </p>



          <div className="flex gap-2 mt-3">
            <Button
              variant="primary"
              size="sm"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
            >
              Delete
            </Button>
            
          </div>
        </div>
      </div>

      {/* IMATGE */}
      <div className="w-full h-48 sm:w-40 sm:h-40 rounded-lg overflow-hidden shrink-0 order-1 sm:order-2">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover border border-gray-200"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 
                          flex flex-col items-center justify-center text-gray-400 gap-1">
            <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] font-medium uppercase">Sense imatge</span>
          </div>
        )}
      </div>

    </div>
  );
}
