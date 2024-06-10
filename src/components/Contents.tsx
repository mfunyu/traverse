import { useReducer } from "react";
import { TripObject } from "../types/trip";
import Map from "./Map";
import Planner from "./Planner";
import { PlansContext, PlansDispatchContext } from "./PlansContext";
import Plans from "../class/Plans";


function planReducer(plans: Plans, action: any) {
  const newPlans = plans.deepCopyPlans();
  switch (action.type) {
  case "add":
    newPlans.addDestination(action.newDest);
    return newPlans;
  case "modify":
    return newPlans;
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