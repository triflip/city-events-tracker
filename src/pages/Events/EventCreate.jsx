import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Button from "../../components/ui/Button";

export default function EventCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    lat: lat ? parseFloat(lat) : "",
    lng: lng ? parseFloat(lng) : "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  console.log("FORM DATA:", formData);


  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase.from("events").insert({
  title: formData.title,
  description: formData.description,
  category: formData.category,
  date: formData.date,
  lat: formData.lat,
  lng: formData.lng,
}).select();

console.log("DATA:", data);
console.log("ERROR:", error);


    navigate("/events");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear esdeveniment</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Títol"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Descripció"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Selecciona categoria</option>
          <option value="concert">Concert</option>
          <option value="expo">Exposició</option>
          <option value="mercat">Mercat</option>
          <option value="festa">Festa popular</option>
          <option value="gastronomia">Gastronomia</option>
        </select>

        <Button variant="primary" size="md" type="submit">
          Guardar esdeveniment
        </Button>
      </form>
    </div>
  );
}
