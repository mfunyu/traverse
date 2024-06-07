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

function createPlan(plans: PlanObject[], date: Date, endDate: Date | null): PlanObject {
  const plan: PlanObject = {
    date: date,
    endDate: endDate,
    destinations: [],
  };
  plans.push(plan);
  plans.sort(sortPlans);
  return plan;
}

function findPlanByDate(plans: PlanObject[], date: Date, endDate: Date | null): PlanObject {
  const newDateInTime = date.getTime();
  for (const plan of plans) {
    const planDateInTime = plan.date.getTime();
    if (!endDate) {
      if (planDateInTime > newDateInTime) {
        return createPlan(plans, date, endDate);
      } else if (planDateInTime === newDateInTime) {
        return plan;
      } else if (plan.endDate && plan.endDate.getTime() > newDateInTime) {
        throw new Error("Cannot add a plan that overlaps with an existing plan");
      }
    } else {
      if (planDateInTime > newDateInTime) {
        if (planDateInTime >= endDate.getTime()) {
          return createPlan(plans, date, endDate);
        } else {
          throw new Error("Cannot add a plan that overlaps with an existing plan");
        }
      }
      if (plan.endDate && plan.endDate.getTime() > newDateInTime) {
        throw new Error("Cannot add a plan that overlaps with an existing plan");
      }
    }
  }
  return createPlan(plans, date, endDate);
}

export function addDestination(plans: PlanObject[], destination: DestinationObject) {
  let endDate: Date | null = null;
  if (destination.lengthOfStay !== 0) {
    endDate = new Date(destination.arrivalDate.getTime() + (destination.lengthOfStay * 24 * 60 * 60 * 1000));
  }
  const plan = findPlanByDate(plans, destination.arrivalDate, endDate);
  plan.destinations.push(destination);
}
