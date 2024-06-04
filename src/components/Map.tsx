import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "../styles/components/Map.scss";
import "leaflet/dist/leaflet.css";
import SearchField from "./SearchField";
import "../styles/components/SearchField.scss";
import { LatLngTuple } from "leaflet";
import MapMarker from "./MapMarker";

function Map() {
  const position: LatLngTuple = [51.505, -0.09];
  return (
    <div className="map">
      <MapContainer
        center={position}
        zoom={13}
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <SearchField />
        <MapMarker />
      </MapContainer>
    </div>
  );
}

export default Map;