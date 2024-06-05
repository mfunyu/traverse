import { Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "../styles/components/MapMarker.scss";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

type D = Icon.Default & {
  _getIconUrl?: string;
};

delete (Icon.Default.prototype as D)._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

function MarkerInRoute() {

  return (
    <div className="popup-item">
      <div className="text">
        <div className="circle-number">1</div>
        <div className="details">
          <h3>Lyon</h3>
          <p>69100 France </p>
        </div>
      </div>
      <button>x Remove from route</button>
    </div>
  );
}

function MarkerNotInRoute() {
  return (
    <div className="popup-item">
      <div className="text">
        < div className="details">
          <h3>Lyon</h3>
          <p>69100 France </p>
        </div >
      </div >
      <button>+ Add to route</button>
    </div >
  );
}

function MapMarker() {
  const position: LatLngTuple = [51.505, -0.09];

  return (
    <Marker position={position} >
      <Popup>
        <MarkerInRoute />
      </Popup>
    </Marker>
  );
}

export default MapMarker;