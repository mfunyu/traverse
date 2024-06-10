import Destination from "../class/Destination";

export interface PlanObject {
  date: Date;
  endDate: Date | null;
  destinations: Destination[];
}
