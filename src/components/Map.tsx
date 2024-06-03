import { MapContainer, TileLayer } from "react-leaflet";
import "../styles/components/Map.scss";
import "leaflet/dist/leaflet.css";

function Map() {
  return (
    <div className="map">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
      >
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default Map;