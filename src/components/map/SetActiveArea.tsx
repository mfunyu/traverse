import { useMap } from "react-leaflet";
import "leaflet-active-area";

function SetActiveArea() {
  const isMobile = window.innerWidth <= 768; // You can adjust the width threshold as needed
  const map = useMap();

  if (!isMobile) {
    map.setActiveArea({
      position: "absolute",
      top: "58px",
      left: "400px",
      width: "calc(100% - 400px)",
      height: "calc(100% - 58px)",
    });
  } else {
    map.setActiveArea({
      position: "absolute",
      top: "100px",
      left: "0",
      width: "100%",
      height: "50%",
    });
  }

  return null;
}

export default SetActiveArea;