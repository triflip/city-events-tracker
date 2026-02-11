import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useMapEvents } from "react-leaflet"
import { useNavigate } from "react-router-dom"

export default function MapPage() {
  const [events, setEvents] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const center = [41.3851, 2.1734] 
  const  [newEventPosition, setNewEventPosition] =useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadEvents() {
      const { data, error } = await supabase
        .from("events")
        .select("*")

      if (error) {
        console.error("Error al carregar esdeveniments:", error)
      } else {
        setEvents(data)
      }
    }

  loadEvents()
}, [])

    const filteredEvents = 
    selectedCategory === "all" 
    ? events 
    : events.filter(event => event.category === selectedCategory)


    function MapClickHandler() {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng
                setNewEventPosition([lat, lng])
            }
        })
        return null
    }


return (
  <div style={{ height: "80vh", width: "100%" }}>
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="all">Totes les categories</option>
      <option value="concert">Concerts</option>
      <option value="expo">Exposicions</option>
      <option value="mercat">Mercats</option>
      <option value="festa">Festes</option>
      <option value="gastronomia">Gastronomia</option>
    </select>

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        {newEventPosition && (
            <Marker position={newEventPosition}>
                <Popup>Nova ubicació seleccionada</Popup>
            </Marker>
        )}

        {filteredEvents.map(event => (
          <Marker key={event.id} position={[event.lat, event.lng]}>
            <Popup>{event.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
