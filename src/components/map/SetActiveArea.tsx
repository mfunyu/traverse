import { useMap } from "react-leaflet";
import "leaflet-active-area";

function SetActiveArea() {

  const map = useMap();
  //@ts-ignore
  map.setActiveArea({
    position: "absolute",
    top: "58px",
    left: "400px",
    width: "calc(100% - 400px)",
    height: "calc(100% - 58px)",
  });

  return null;
}

export default SetActiveArea;