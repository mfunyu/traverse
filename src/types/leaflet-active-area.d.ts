import * as L from "leaflet";

declare module "leaflet" {
  interface Map {
    setActiveArea: (options: L.Control.PositionOptions & { width: string, height: string }) => void;
  }
}
