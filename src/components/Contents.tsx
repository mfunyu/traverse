import { useReducer } from "react";
import { TripObject } from "../types/trip";
import Map from "./Map";
import Planner from "./Planner";
import Plan from "../class/Plan";
import { PlansContext, PlansDispatchContext } from "./PlansContext";
import { addDestination, deepCopyPlans } from "../class/PlanController";


function planReducer(plans: Plan[], action: any) {
  const newPlans = deepCopyPlans(plans);
  switch (action.type) {
  case "add":
    addDestination(newPlans, action.newDest);
    return newPlans;
  case "remove":
    return plans.filter((plan) => plan !== action.plan);
  default:
    return plans;
  }
}

function Contents({ trip }: { trip: TripObject }) {
  //@ts-ignore
  const [plans, dispatch] = useReducer(planReducer, trip.plans);

  return (
    <div>
      <PlansContext.Provider value={plans}>
        <PlansDispatchContext.Provider value={dispatch}>
          <Planner trip={trip} />
          <Map />
        </PlansDispatchContext.Provider>
      </PlansContext.Provider>
    </div>
  );
}

export default Contents;