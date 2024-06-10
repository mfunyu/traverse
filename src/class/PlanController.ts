import Plan from "../class/Plan";
import Destination from "./Destination";

export function deepCopyPlans(plans: Plan[]): Plan[] {
  return plans.map(plan => plan.deepCopy());
}

function sortPlans(a: Plan, b: Plan): number {
  if (a.date.getTime() === b.date.getTime()) {
    if (a.endDate)
      return 1;
    return -1;
  }
  return a.date.getTime() - b.date.getTime();
}

function createPlan(plans: Plan[], date: Date, endDate: Date | null): Plan {
  const plan: Plan = new Plan(date, endDate, []);
  plans.push(plan);
  plans.sort(sortPlans);
  return plan;
}

function checkPlan(plan: Plan, date: Date, endDate: Date | null): "create" | "overlap" | "exist" | "none" {
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

export function isValidDate(plans: Plan[], date: Date, lengthOfStay: number): boolean {
  const endDate = lengthOfStay === 0 ? null : new Date(date.getTime() + (lengthOfStay * 24 * 60 * 60 * 1000));
  console.log("Checking date", plans, date, endDate);
  for (const plan of plans) {
    const result = checkPlan(plan, date, endDate);
    if (result === "overlap") {
      return false;
    }
  }
  return true;
}

function findPlanByDate(plans: Plan[], date: Date, endDate: Date | null): Plan {
  for (const plan of plans) {
    const result = checkPlan(plan, date, endDate);
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

export function addDestination(plans: Plan[], destination: Destination) {
  destination.arrivalDate.setHours(0, 0, 0);
  let endDate: Date | null = null;
  if (destination.lengthOfStay !== 0) {
    endDate = new Date(destination.arrivalDate.getTime() + (destination.lengthOfStay * 24 * 60 * 60 * 1000));
  }
  const plan = findPlanByDate(plans, destination.arrivalDate, endDate);
  console.log("Adding destination", plans);
  plan.destinations.push(destination);
}
