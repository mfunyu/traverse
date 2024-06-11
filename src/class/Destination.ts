import { LatLngTuple } from "leaflet";
import { DestinationObject } from "../types/destination";
import { v4 as uuidv4 } from "uuid";

class Destination implements DestinationObject {
  readonly id: string;
  readonly label: string;
  readonly latLng: LatLngTuple;
  readonly address: string;

  customLabel: string | null;
  arrivalDate: Date;
  lengthOfStay: number;
  notes: string | null;

  constructor(label: string, latLng: number[] | LatLngTuple, customLabel: string | null, arrivalDate: Date, lengthOfStay: number, notes: string | null, address?: string, id?: string) {
    this.id = id || uuidv4();
    this.label = label.split(",")[0];
    this.latLng = [latLng[0], latLng[1]];
    this.address = address || label;
    this.customLabel = customLabel;
    this.arrivalDate = arrivalDate;
    this.lengthOfStay = lengthOfStay;
    this.notes = notes;
  }

  static fromJSON(json: DestinationObject): Destination {
    if (!json.arrivalDate)
      throw new Error("arrivalDate is undefined");
    return new Destination(json.label, json.latLng, json.customLabel, new Date(json.arrivalDate), json.lengthOfStay, json.notes, json.address, json.id);
  }

  deepCopy(): Destination {
    const newDest = new Destination(this.label, this.latLng, this.customLabel, this.arrivalDate, this.lengthOfStay, this.notes, this.address, this.id);
    return newDest;
  }

  static deepCopy(dest: Destination): Destination {
    return dest.deepCopy();
  }
}

export default Destination;