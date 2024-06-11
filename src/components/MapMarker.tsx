import { Marker, Popup } from "react-leaflet";
import "../styles/components/MapMarker.scss";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useContext } from "react";
import { PlansDispatchContext } from "./PlansContext";
import { PlansActionType } from "../reducer/PlansReducer";
import Destination from "../class/Destination";

type Props = {
  dest: Destination;
  index: number;
}

type D = Icon.Default & {
  _getIconUrl?: string;
};

delete (Icon.Default.prototype as D)._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

function MarkerInRoute({ dest, index }: Props) {
  const dispatch = useContext(PlansDispatchContext);

  function handleDelete() {
    if (!dispatch)
      throw new Error("usePlansDispatch must be used within a PlansProvider");
    dispatch({ type: PlansActionType.DELETE, newDest: dest });
  }

  return (
    <div className="popup-item">
      <div className="text">
        <div className="circle-number">{index}</div>
        <div className="details">
          <h3>{dest.label}</h3>
          <p>{dest.address}</p>
        </div>
      </div>
      <button onClick={handleDelete}>x Remove from route</button>
    </div>
  );
}

function MapMarker({ dest, index }: Props) {

  return (
    <Marker position={dest.latLng} >
      <Popup>
        <MarkerInRoute dest={dest} index={index}/>
      </Popup>
    </Marker>
  );
}

export default MapMarker;