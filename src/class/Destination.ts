import { LatLngTuple } from "leaflet";
import { DestinationObject } from "../types/destination";

class Destination implements DestinationObject {
  readonly label: string;
  readonly latLng: LatLngTuple;
  readonly address: string;

  customLabel: string | null;
  arrivalDate: Date;
  lengthOfStay: number;
  notes: string | null;

  constructor(label: string, latLng: number[], customLabel: string | null, arrivalDate: Date, lengthOfStay: number, notes: string | null) {
    this.label = label.split(",")[0];
    this.latLng = [latLng[0], latLng[1]];
    this.address = label;
    this.customLabel = customLabel;
    this.arrivalDate = arrivalDate;
    this.lengthOfStay = lengthOfStay;
    this.notes = notes;
  }
}

export default Destination;