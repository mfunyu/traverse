import { LatLngTuple } from "leaflet";

export interface DestinationObject {
  label: string;
  latLang: LatLngTuple;
  address: string;

  order: number;
  customLabel: string | null;
  arrivalDate: Date;
  lengthOfStay: number;
  notes: string | null;
}