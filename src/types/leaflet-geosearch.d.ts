// types/leaflet-geosearch.d.ts

declare module "leaflet-geosearch" {
  import * as L from "leaflet";

  export interface GeoSearchControlOptions extends L.ControlOptions {
    provider: any;
    style?: string;
    showMarker?: boolean;
    showPopup?: boolean;
    marker?: any;
    popupFormat?: (result: any) => string;
    maxMarkers?: number;
    retainZoomLevel?: boolean;
    animateZoom?: boolean;
    autoClose?: boolean;
    searchLabel?: string;
    keepResult?: boolean;
    updateMap?: boolean;
    autoComplete?: boolean;
    autoCompleteDelay?: number;
  }

  export class GeoSearchControl extends L.Control {
    constructor(options: GeoSearchControlOptions);
  }

  export class OpenStreetMapProvider {
    constructor(options?: any);
    search(options: { query: string }): Promise<any>;
  }
}
