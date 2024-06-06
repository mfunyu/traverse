import { DestinationObject } from "../types/destination";
import { PlanObject } from "../types/plan";

function sortPlans(a: PlanObject, b: PlanObject): number {
  if (a.date.getTime() === b.date.getTime()) {
    if (a.endDate)
      return 1;
    return -1;
  }
  return b.date.getTime() - a.date.getTime();
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
    for (const plan of this._plans) {
      if (!endDate) {
        if (plan.date.getTime() > date.getTime()) {
          return this.createPlan(date, endDate);
        } else if (plan.date.getTime() === date.getTime()) {
          return plan;
        } else if (plan.endDate && plan.endDate.getTime() > date.getTime()) {
          throw new Error("Cannot add a plan that overlaps with an existing plan");
        }
      } else {
        if (plan.date.getTime() > date.getTime()) {
          if (plan.date.getTime() >= endDate.getTime()) {
            return this.createPlan(date, endDate);
          } else {
            throw new Error("Cannot add a plan that overlaps with an existing plan");
          }
        }
        if (plan.endDate && plan.endDate.getTime() > date.getTime()) {
          throw new Error("Cannot add a plan that overlaps with an existing plan");
        }
      }
    }
    return this.createPlan(date, endDate);
  }

  addDestination(destination: DestinationObject) {
    const plan = this.findPlanByDate(destination.arrivalDate, new Date(destination.arrivalDate.getTime() + (destination.lengthOfStay * 24 * 60 * 60 * 1000)));
    plan.destinations.push(destination);
  }

  get plans(): PlanObject[] {
    return this._plans;
  }
}