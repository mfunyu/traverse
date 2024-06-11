import Plans from "../class/Plans";
import Destination from "../class/Destination";

export enum PlansActionType {
  ADD = "add",
  MODIFY = "modify",
  REPLACE = "replace",
  DELETE = "delete",
  CLEAR = "clear",
}

export interface PlansAction {
  type: PlansActionType;
  newDest?: Destination;
}

export function plansReducer(plans: Plans, action: PlansAction): Plans {
  const newPlans = plans.deepCopyPlans();
  if (action.type === PlansActionType.CLEAR) {
    newPlans.clearPlans();
    return newPlans;
  }
  if (!action.newDest)
    throw new Error("newDest is undefined");

  switch (action.type) {
  case PlansActionType.ADD:
    newPlans.addDestination(action.newDest);
    return newPlans;
  case PlansActionType.MODIFY:
    newPlans.modifyDestination(action.newDest);
    return newPlans;
  case PlansActionType.REPLACE:
    newPlans.replaceDestination(action.newDest);
    return newPlans;
  case PlansActionType.DELETE:
    newPlans.deleteDestination(action.newDest.id);
    return newPlans;
  default:
    return plans;
  }
}