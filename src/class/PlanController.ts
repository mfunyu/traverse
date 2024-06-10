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

function checkOverlap(plan: PlanObject, date: Date, endDate: Date | null): "create" | "overlap" | "exist" | "none" {
  const newDateInTime = Math.floor(date.getTime() / 1000);
  const endDateInTime = endDate ? Math.floor(endDate.getTime() / 1000) : 0;
  const planDateInTime = Math.floor(plan.date.getTime() / 1000);
  const planEndDateInTime = plan.endDate ? Math.floor(plan.endDate.getTime() / 1000) : 0;
  if (!endDate) {
    if (planDateInTime > newDateInTime) {
      return "create";
    }
    if (plan.endDate) {
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
    if (plan.endDate && planEndDateInTime > newDateInTime) {
      return "overlap";
    }
  }
  return "none";
}

function findPlanByDate(plans: PlanObject[], date: Date, endDate: Date | null): PlanObject {
  for (const plan of plans) {
    const result = checkOverlap(plan, date, endDate);
    if (result === "exist") {
      return plan;
    }
    if (result === "create") {
      return createPlan(plans, date, endDate);
    }
    if (result === "overlap") {
      throw new Error("Overlapping plans");
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
