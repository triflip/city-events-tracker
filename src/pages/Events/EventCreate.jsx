import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import Button from "../../components/ui/Button";

export default function EventCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  
  const [errorMsg, setErrorMsg] =useState("");
  const [imageFile, setImageFile] = useState(null);

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

  async function getLocationName(lat, lng) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    {
      headers: {
        "User-Agent": "city-events-tracker/1.0", 
      },
    }
  );

  if (!res.ok) {
    console.error("Error obtenint lloc:", res.statusText);
    return null;
  }

  const data = await res.json();
  const addr = data.address;

  const street = addr.road || "";
  const number = addr.house_number || "";
  const city = addr.city || addr.town;
  const state = addr.state || "";

  const shortAddress = `${street}, ${number}\n${city}, ${state}`;


  return shortAddress;
}


async function handleSubmit(e) {
  e.preventDefault();

  let location = null;
  if (formData.lat && formData.lng) {
    location = await getLocationName(formData.lat, formData.lng);
  }
  if (!formData.title.trim()) { 
    setErrorMsg("El títol és obligatori"); 
    return; 
  } 
  if (!formData.description.trim()) { 
    setErrorMsg("La descripció és obligatòria"); 
    return; 
  }
  if (!formData.category) { 
    setErrorMsg("Has de seleccionar una categoria"); 
    return; 
   }
   if (!formData.date) { 
    setErrorMsg("Has d'indicar una data i hora"); 
    return; 
    } if (!formData.lat || !formData.lng) { 
    setErrorMsg("Has de seleccionar una ubicació al mapa"); 
    return; 
    } 
    setErrorMsg("");

    let imageUrl = null;

if (imageFile) {
  const fileExt = imageFile.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("event-images") // nom del bucket
    .upload(filePath, imageFile);

  if (uploadError) {
    console.error("Error pujant imatge:", uploadError);
    // pots fer setErrorMsg si vols
  } else {
    const { data: publicUrlData } = supabase.storage
      .from("event-images")
      .getPublicUrl(filePath);

    imageUrl = publicUrlData.publicUrl;
  }
}



  // 2. Guardar a Supabase
  const { data, error } = await supabase
    .from("events")
    .insert({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      date: formData.date,
      lat: formData.lat,
      lng: formData.lng,
      location: location, 
      image_url: imageUrl 
    })
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) return;

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

        <input 
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0] || null)}
        className="border p-2 rounded"
        />

        {errorMsg && (
  <p className="text-red-600 font-medium">{errorMsg}</p>
)}
        <Button variant="primary" size="md" type="submit">
          Guardar esdeveniment
        </Button>


      </form>
    </div>
  );
}
