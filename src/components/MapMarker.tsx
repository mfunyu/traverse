import { Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "../styles/components/MapMarker.scss";

function MapMarker() {
  const position: LatLngTuple = [51.505, -0.09];

  return (
    <Marker position={position}>
      <Popup>
        <div className="popup-item">
          <div className="text">
            <div className="circle-number">1</div>
            <div className="details">
              <h3>Lyon</h3>
              <p>69100 France </p>
            </div>
          </div>
          <button>Add to route</button>
        </div>
      </Popup>
    </Marker>
  );
}

export default MapMarker;