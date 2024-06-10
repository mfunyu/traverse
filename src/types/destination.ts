import { LatLngTuple } from "leaflet";

export interface DestinationObject {
  label: string;
  latLng: LatLngTuple;
  address: string;

  customLabel: string | null;
  arrivalDate: Date | null;
  lengthOfStay: number;
  notes: string | null;
}