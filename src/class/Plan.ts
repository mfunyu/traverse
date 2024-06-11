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

  static fromJSON(json: PlanObject): Plan {
    return new Plan(new Date(json.date), json.endDate ? new Date(json.endDate) : null, json.destinations.map((dest) => Destination.fromJSON(dest)));
  }

  deepCopy(): Plan {
    const dateCopy = new Date(this.date);
    const endDateCopy = this.endDate ? new Date(this.endDate) : null;
    const destinationsCopy = this.destinations.map((dest) => dest.deepCopy());

    return new Plan(dateCopy, endDateCopy, destinationsCopy);
  }

  checkPlan(date: Date, endDate: Date | null): "create" | "overlap" | "exist" | "none" {
    const newDateInTime = Math.floor(date.getTime() / 1000);
    const endDateInTime = endDate ? Math.floor(endDate.getTime() / 1000) : 0;
    const planDateInTime = Math.floor(this.date.getTime() / 1000);
    const planEndDateInTime = this.endDate ? Math.floor(this.endDate.getTime() / 1000) : 0;
    if (!endDate) {
      if (planDateInTime > newDateInTime) {
        return "create";
      }
      if (this.endDate) {
        if (planDateInTime == newDateInTime) {
          return "create";
        } else if (planEndDateInTime > newDateInTime) {
          return "overlap";
        }
      } else if (planDateInTime === newDateInTime) {
        return "exist";
      }
    } else {
      if (planDateInTime > newDateInTime) {
        if (planDateInTime >= endDateInTime) {
          return "create";
        } else {
          return "overlap";
        }
      }
      if (this.endDate && planEndDateInTime > newDateInTime) {
        return "overlap";
      }
    }
    return "none";
  }
}

export default Plan;