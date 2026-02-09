import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

export default function MapPage() {
  const center = [41.3851, 2.1734] // Barcelona

  return (
    <div style={{ height: "80vh", width: "100%" }}>
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
      </MapContainer>
    </div>
  )
}
