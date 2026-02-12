import { supabase } from "../lib/supabaseClient";
import Button from "./ui/Button";

export default function EventCard({ event, onDelete }) {

async function handleDelete() {
  const confirmDelete = window.confirm("Segur que vols eliminar aquest esdeveniment?");
  if (!confirmDelete) return;

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", event.id);

    console.log("DELETE ERROR:", error);
    console.log("ID QUE ENVIO A DELETE:", event.id);


  if (error) {
    console.error("Error eliminant:", error);
    return;
  }

  onDelete(event.id);
}



  return (
    <div className="p-4 bg-white shadow rounded hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold">{event.title}</h3>

        <p className="text-gray-600 mt-1">{event.description}</p>

        {event.location&& (
          <p className="text-sm text-gray-500 mt-2 whitespace-pre-line">
  {event.location}
</p>

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

        <Button variant="danger" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
