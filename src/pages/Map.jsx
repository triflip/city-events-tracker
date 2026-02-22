import { useEffect, useState, useRef, useMemo } from "react";
import { supabase } from "../lib/supabaseClient";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import "leaflet/dist/leaflet.css";
import "../hooks/leafletFix.js";

const MAP_CENTER = [41.3851, 2.1734];

function MapClickHandler({ isCreating, onMapClick }) {
  useMapEvents({
    click(e) {
      if (!isCreating) return;
      const { lat, lng } = e.latlng;
      onMapClick([lat, lng]);
    },
  });
  return null;
}

function AutoOpenPopup({ markerRef, children }) {
  useEffect(() => {
    if (markerRef.current) {
      const timer = setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.openPopup();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [markerRef]);

  return <Popup>{children}</Popup>;
}

export default function MapPage() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newEventPosition, setNewEventPosition] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const markerRef = useRef(null);

  useEffect(() => {
    async function loadEvents() {
      const { data, error } = await supabase.from("events").select("*");
      if (error) {
        console.error("Error al carregar esdeveniments:", error);
      } else {
        setEvents(data);
      }
    }
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() =>
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.category === selectedCategory),
    [events, selectedCategory]
  );

  return (
    <div style={{ display: "flex", height: "80vh", width: "100%" }}>
      <div
        className="sidebar-desktop"
        style={{
          width: "260px",
          padding: "16px",
          borderRight: "1px solid #ddd",
          background: "#fafafa",
        }}
      >
        <Button
          variant="primary"
          size="md"
          className="w-full mb-3"
          onClick={() => setIsCreating(true)}
        >
          + Crear esdeveniment
        </Button>

        {isCreating && (
          <p style={{ color: "#555" }}>
            Clica al mapa per situar l'esdeveniment
          </p>
        )}
      </div>

      <div style={{ flex: 1, padding: "0 16px" }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Totes les categories</option>
          <option value="concert">Concerts</option>
          <option value="expo">Exposicions</option>
          <option value="mercat">Mercats</option>
          <option value="festa">Festes populars</option>
          <option value="gastronomia">Gastronomia</option>
        </select>

        <div style={{ height: "100%", width: "100%", marginTop: "10px" }}>
          <MapContainer
            center={MAP_CENTER}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapClickHandler isCreating={isCreating} onMapClick={setNewEventPosition} />

            {newEventPosition && (
              <Marker position={newEventPosition} ref={markerRef}>
                <AutoOpenPopup markerRef={markerRef}>
                  <div className="flex flex-col gap-2">
                    <span>Crear esdeveniment aquí?</span>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        navigate(`/events/create?lat=${newEventPosition[0]}&lng=${newEventPosition[1]}`)
                      }
                    >
                      Crear
                    </Button>
                  </div>
                </AutoOpenPopup>
              </Marker>
            )}

            {filteredEvents.map((event) => (
              <Marker key={event.id} position={[event.lat, event.lng]}>
                <Popup>{event.title}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}