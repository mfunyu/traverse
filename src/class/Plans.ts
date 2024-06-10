import { calcNdaysFromDate } from "../utils/dateUtils";
import Destination from "./Destination";
import Plan from "./Plan";

class Plans {
  plans: Plan[];

  constructor(plans: Plan[]) {
    this.plans = plans;
  }

  static sortPlans(a: Plan, b: Plan): number {
    if (a.date.getTime() === b.date.getTime()) {
      if (a.endDate)
        return 1;
      return -1;
    }
    return a.date.getTime() - b.date.getTime();
  }

  allDestinations(): Destination[] {
    return this.plans.reduce((acc: Destination[], plan: Plan) => {
      return acc.concat(plan.destinations);
    }, []);
  }

  deepCopyPlans(): Plans {
    return new Plans(this.plans.map((plan) => plan.deepCopy()));
  }

  isValidDate(date: Date, lengthOfStay: number, id: string): boolean {
    const endDate = lengthOfStay ? calcNdaysFromDate(date, lengthOfStay) : null;
    console.log("Checking date", this.plans, date, endDate);
    for (const plan of this.plans) {
      const result = plan.checkPlan(date, endDate);
      if (result === "overlap") {
        if (plan.destinations.length === 1 && plan.destinations[0].id === id)
          continue;
        return false;
      }
      if (result === "exist" || result === "create") {
        return true;
      }
    }
    return true;
  }

  createPlan(date: Date, endDate: Date | null): Plan {
    const plan: Plan = new Plan(date, endDate, []);
    this.plans.push(plan);
    this.plans.sort(Plans.sortPlans);
    return plan;
  }

  findPlanByDate(date: Date, endDate: Date | null): Plan {
    for (const plan of this.plans) {
      const result = plan.checkPlan(date, endDate);
      if (result === "exist") {
        return plan;
      }
      if (result === "create") {
        return this.createPlan(date, endDate);
      }
      if (result === "overlap") {
        throw new Error("Overlapping plans");
      }
    }
    return this.createPlan(date, endDate);
  }

  addDestination(destination: Destination) {
    destination.arrivalDate.setHours(0, 0, 0);
    let endDate: Date | null = null;
    if (destination.lengthOfStay !== 0) {
      endDate = calcNdaysFromDate(destination.arrivalDate, destination.lengthOfStay);
    }
    const plan = this.findPlanByDate(destination.arrivalDate, endDate);
    console.log("Adding destination", this.plans);
    plan.destinations.push(destination);
  }

  removeDestination(id: string) {
    let emptyPlanIndex = -1;
    for (const plan of this.plans) {
      const index = plan.destinations.findIndex((dest) => dest.id === id);
      if (index !== -1) {
        plan.destinations.splice(index, 1);
        if (plan.destinations.length === 0) {
          emptyPlanIndex = this.plans.indexOf(plan);
        }
        break;
      }
    }
    if (emptyPlanIndex !== -1) {
      this.plans.splice(emptyPlanIndex, 1);
    }
    console.log("Removed destination", this.plans);
  }

  replaceDestination(newDest: Destination) {
    this.removeDestination(newDest.id);
    this.addDestination(newDest);
  }
}

export default Plans;