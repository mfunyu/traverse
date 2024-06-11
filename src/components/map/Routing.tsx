import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "leaflet-routing-machine";

type RoutingProps = {
  from: LatLngTuple;
  to: LatLngTuple;
}

function Routing ({ from, to }: RoutingProps) {
  const map = useMap();

  useEffect(() => {
    //@ts-ignore
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1])
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => { map.removeControl(routingControl); };
  }, [map, from, to]);

  return null;
}

export default Routing;