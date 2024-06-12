import { createControlComponent } from "@react-leaflet/core";
import L, { LatLngTuple } from "leaflet";
import "leaflet-routing-machine";

type RoutingProps = {
  from: LatLngTuple;
  to: LatLngTuple;
}

const Routing = (props: RoutingProps) => {
  const { from, to } = props;
  // @ts-ignore
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(from),
      L.latLng(to)
    ],
    createMarker: () => null, // Suppress default markers
    routeWhileDragging: false,
    show: false, // Disable the default instructions panel
    showAlternatives: false, // Disable showing alternative routes
    addWaypoints: false, // Disable adding new waypoints
    draggableWaypoints: false,
    fitSelectedRoutes: true,
  });

  return instance;
};

//@ts-ignore
const RoutingMachine = createControlComponent<RoutingProps>(Routing);

export default RoutingMachine;