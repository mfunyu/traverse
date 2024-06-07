import { DestinationObject } from "../types/destination";
import { PlanObject } from "../types/plan";

function sortPlans(a: PlanObject, b: PlanObject): number {
  if (a.date.getTime() === b.date.getTime()) {
    if (a.endDate)
      return 1;
    return -1;
  }
  return a.date.getTime() - b.date.getTime();
}

export class PlanController {
  private _plans: PlanObject[] = [];

  constructor(plans: PlanObject[] = []) {
    this._plans = plans;
  }

  getDestinations(): DestinationObject[] {
    return this.plans.reduce((acc: DestinationObject[], plan) => { return acc.concat(plan.destinations); }, []);
  }

  createPlan(date: Date, endDate: Date | null): PlanObject {
    const plan: PlanObject = {
      date: date,
      endDate: endDate,
      destinations: [],
    };
    this.plans.push(plan);
    this.plans.sort(sortPlans);
    return plan;
  }

  findPlanByDate(date: Date, endDate: Date | null): PlanObject {
    const newDateInTime = date.getTime();
    for (const plan of this._plans) {
      const planDateInTime = plan.date.getTime();
      if (!endDate) {
        if (planDateInTime > newDateInTime) {
          return this.createPlan(date, endDate);
        } else if (planDateInTime === newDateInTime) {
          return plan;
        } else if (plan.endDate && plan.endDate.getTime() > newDateInTime) {
          throw new Error("Cannot add a plan that overlaps with an existing plan");
        }
      } else {
        if (planDateInTime > newDateInTime) {
          if (planDateInTime >= endDate.getTime()) {
            return this.createPlan(date, endDate);
          } else {
            throw new Error("Cannot add a plan that overlaps with an existing plan");
          }
        }
        if (plan.endDate && plan.endDate.getTime() > newDateInTime) {
          throw new Error("Cannot add a plan that overlaps with an existing plan");
        }
      }
    }
    return this.createPlan(date, endDate);
  }

  addDestination(destination: DestinationObject) {
    let endDate: Date | null = null;
    if (destination.lengthOfStay !== 0) {
      endDate = new Date(destination.arrivalDate.getTime() + (destination.lengthOfStay * 24 * 60 * 60 * 1000));
    }
    const plan = this.findPlanByDate(destination.arrivalDate, endDate);
    plan.destinations.push(destination);
  }

  get plans(): PlanObject[] {
    return this._plans;
  }
}