import { PlanObject } from "../types/plan";
import Destination from "./Destination";

class Plan implements PlanObject {
  date: Date;
  endDate: Date | null;
  destinations: Destination[];

  constructor(date: Date, endDate: Date | null, destinations: Destination[]) {
    this.date = date;
    this.endDate = endDate;
    this.destinations = destinations;
  }

  deepCopy(): Plan {
    const dateCopy = new Date(this.date);
    const endDateCopy = this.endDate ? new Date(this.endDate) : null;
    const destinationsCopy = this.destinations.map((dest) => dest.deepCopy());

    return new Plan(dateCopy, endDateCopy, destinationsCopy);
  }
}

export default Plan;