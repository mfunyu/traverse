import { DestinationObject } from "../types/destination";
import { PlanObject } from "../types/plan";

function deepCopyPlan(plan: PlanObject): PlanObject {
  function deepCopyDestination(destination: DestinationObject): DestinationObject {
    return { ...destination };
  }

  const dateCopy = new Date(plan.date);
  const endDateCopy = plan.endDate ? new Date(plan.endDate) : null;

  const destinationsCopy = plan.destinations.map(deepCopyDestination);

  return {
    date: dateCopy,
    endDate: endDateCopy,
    destinations: destinationsCopy,
  };
}

export function deepCopyPlans(plans: PlanObject[]): PlanObject[] {
  return plans.map(deepCopyPlan);
}

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
  const newDateInTime = Math.floor(date.getTime() / 1000);
  for (const plan of plans) {
    const planDateInTime = Math.floor(plan.date.getTime() / 1000);
    if (!endDate) {
      if (planDateInTime > newDateInTime) {
        console.log("Creating plan", plans);
        console.log("planDateInTime", planDateInTime);
        console.log("newDateInTime", newDateInTime);
        return createPlan(plans, date, endDate);
      } else if (planDateInTime === newDateInTime) {
        console.log("Returning plan", plans);
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
  destination.arrivalDate.setHours(0, 0, 0);
  let endDate: Date | null = null;
  if (destination.lengthOfStay !== 0) {
    endDate = new Date(destination.arrivalDate.getTime() + (destination.lengthOfStay * 24 * 60 * 60 * 1000));
  }
  const plan = findPlanByDate(plans, destination.arrivalDate, endDate);
  console.log("Adding destination", plans);
  plan.destinations.push(destination);
}
