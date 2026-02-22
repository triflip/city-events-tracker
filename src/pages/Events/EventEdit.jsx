import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateEventById, uploadEventImage } from "./../../lib/events";
import { useEvent } from "../../hooks/useEvents";

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    imageUrl: "",
    newImage: null,
  });

  const { event, loading, error } = useEvent(id);

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        description: event.description || "",
        date: event.date ? event.date.slice(0, 16) : "",
        location: event.location || "",
        category: event.category || "",
        imageUrl: event.image_url || "",
        newImage: null,
      });
    }
  }, [event]);

  async function handleSave() {
    if (!form.title.trim()) {
      alert("El títol és obligatori");
      return;
    }

    let imageUrlToSave = form.imageUrl;
    if (form.newImage) {
      imageUrlToSave = await uploadEventImage(form.newImage);
    }

    const updatedEvent = {
      title: form.title.trim(),
      description: form.description.trim(),
      date: new Date(form.date).toISOString(),
      location: form.location.trim(),
      category: form.category.trim(),
      image_url: imageUrlToSave,
    };

    try {
      await updateEventById(id, updatedEvent);
      navigate("/");
    } catch (err) {
      console.error("Error actualitzant:", err);
      alert("Hi ha hagut un error en guardar els canvis");
    }
  }

  if (loading) return <p>Carregant dades...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar esdeveniment</h1>

      <form className="flex flex-col gap-4 mt-4">
        <label className="flex flex-col">
          <span className="font-medium">Títol</span>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Descripció</span>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Data i hora</span>
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Ubicació</span>
          <textarea
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="border p-2 rounded"
          />
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Categoria</span>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="">Selecciona...</option>
            <option value="concert">Concert</option>
            <option value="expo">Exposició</option>
            <option value="mercat">Mercat</option>
            <option value="festa">Festa popular</option>
            <option value="gastronomia">Gastronomia</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Imatge actual</span>
          {form.imageUrl ? (
            <img src={form.imageUrl} alt="Event" className="w-32 rounded mb-2" />
          ) : (
            <span className="text-gray-500">No hi ha imatge</span>
          )}
        </label>

        <label className="flex flex-col">
          <span className="font-medium">Pujar nova imatge</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, newImage: e.target.files[0] })}
            className="border p-2 rounded"
          />
        </label>

        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar canvis
        </button>
      </form>
    </div>
  );
}