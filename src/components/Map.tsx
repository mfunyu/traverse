import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "../styles/components/Map.scss";
import "leaflet/dist/leaflet.css";
import SearchField from "./SearchField";
import "../styles/components/SearchField.scss";
import { LatLngTuple } from "leaflet";
import MapMarker from "./MapMarker";
import { DestinationObject } from "../types/destination";
import "../styles/components/MapMarker.scss";
import { AddModal } from "./Modal";
import { useContext, useState } from "react";
import { PlansContext } from "./PlansContext";

function Map() {
  const plans = useContext(PlansContext);
  const position: LatLngTuple = [51.505, -0.09];
  const allDests: DestinationObject[] = plans.reduce((acc: DestinationObject[], plan) => acc.concat(plan.destinations), []);

  const [modalOpen, setModalOpen] = useState(false);
  const [latLng, setLatLng] = useState([0, 0]);
  const [label, setLabel] = useState("");

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleAddLocation(x: number, y: number, label: string) {
    setLatLng([x, y]);
    setLabel(label);
    setModalOpen(true);
  }

  return (
    <>
      {modalOpen && <AddModal latLng={latLng} label={label} onClose={handleCloseModal}/>}
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
          <SearchField onAddLocation={handleAddLocation}/>
          {allDests.map((dest, index) => <MapMarker key={index} dest={dest} index={index + 1}/>)}
        </MapContainer>
      </div>
    </>
  );
}

export default Map;