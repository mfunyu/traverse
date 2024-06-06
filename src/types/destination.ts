import { LatLngTuple } from "leaflet";

export interface DestinationObject {
  label: string;
  latLang: LatLngTuple;
  address: string;

  customLabel: string | null;
  arrivalDate: Date;
  lengthOfStay: number;
  notes: string | null;
}