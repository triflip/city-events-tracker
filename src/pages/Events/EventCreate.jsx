import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Button from "../../components/ui/Button";

export default function EventCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");

  const [errorMsg, setErrorMsg] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estil per al botó

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    lat: latParam ? parseFloat(latParam) : "",
    lng: lngParam ? parseFloat(lngParam) : "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function getLocationName(lat, lng) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        {
          headers: { "User-Agent": "city-events-tracker/1.0" },
        },
      );

      if (!res.ok) return null;

      const data = await res.json();
      const addr = data.address;

      const street = addr.road || "";
      const number = addr.house_number || "";
      const city = addr.city || addr.town || addr.village || "";
      const state = addr.state || "";

      const shortAddress = `${street}, ${number} ${city}, ${state}`.trim();

      return { shortAddress, city, state };
    } catch (err) {
      console.error("Error Nominatim:", err);
      return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formData.title.trim()) {
      setErrorMsg("El títol és obligatori");
      setIsSubmitting(false);
      return;
    }
    if (!formData.description.trim()) {
      setErrorMsg("La descripció és obligatòria");
      setIsSubmitting(false);
      return;
    }
    if (!formData.category) {
      setErrorMsg("Selecciona una categoria");
      setIsSubmitting(false);
      return;
    }
    if (!formData.date) {
      setErrorMsg("Indica una data i hora");
      setIsSubmitting(false);
      return;
    }
    if (!formData.lat || !formData.lng) {
      setErrorMsg("Falta la ubicació del mapa");
      setIsSubmitting(false);
      return;
    }

    setErrorMsg("");

    let imageUrl = null;
    const loc = await getLocationName(formData.lat, formData.lng);

    // Pujada d'imatge
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("event-images")
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Error pujant imatge:", uploadError);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from("event-images")
          .getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }
    }

    // Guardar a Supabase
    const { error } = await supabase.from("events").insert({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      date: formData.date,
      lat: formData.lat,
      lng: formData.lng,
      location: loc.shortAddress,
      city: loc.city,
      state: loc.state,

      image_url: imageUrl,
    });

    if (error) {
      console.error("Error insertant:", error);
      setErrorMsg("Error al guardar a la base de dades");
      setIsSubmitting(false);
    } else {
      navigate("/events");
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-2xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Crear esdeveniment
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Títol</label>
          <input
            type="text"
            name="title"
            placeholder="Ex: Concert de Jazz"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">
            Descripció
          </label>
          <textarea
            name="description"
            placeholder="Explica de què tracta..."
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 p-2.5 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Data i Hora
            </label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">
              Categoria
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Selecciona...</option>
              <option value="concert">Concert</option>
              <option value="expo">Exposició</option>
              <option value="mercat">Mercat</option>
              <option value="festa">Festa popular</option>
              <option value="gastronomia">Gastronomia</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">
            Imatge de portada
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0] || null)}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3">
            <p className="text-red-700 text-sm font-medium">{errorMsg}</p>
          </div>
        )}

        <Button
          variant="primary"
          size="lg"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardant..." : "Publicar esdeveniment"}
        </Button>
      </form>
    </div>
  );
}
