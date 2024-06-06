import { DestinationObject } from "./destination";

export interface PlanObject {
	date: Date;
	endDate: Date | null;
	destinations: DestinationObject[];
}
