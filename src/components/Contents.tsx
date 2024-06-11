import { useReducer } from "react";
import { TripObject } from "../types/trip";
import Map from "./Map";
import Planner from "./Planner";
import { PlansContext, PlansDispatchContext } from "./PlansContext";
import Plans from "../class/Plans";
import Destination from "../class/Destination";
import NavigationBar from "./NavigationBar";


function planReducer(plans: Plans, action: { type: string, newDest: Destination }) {
  const newPlans = plans.deepCopyPlans();
  switch (action.type) {
  case "add":
    newPlans.addDestination(action.newDest);
    return newPlans;
  case "modify":
    newPlans.modifyDestination(action.newDest);
    return newPlans;
  case "replace":
    newPlans.replaceDestination(action.newDest);
    console.log(newPlans.allDestinations());
    return newPlans;
  case "delete":
    newPlans.deleteDestination(action.newDest.id);
    return newPlans;
  case "clear":
    newPlans.clearPlans();
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
          <NavigationBar />
          <Planner trip={trip} />
          <Map />
        </PlansDispatchContext.Provider>
      </PlansContext.Provider>
    </div>
  );
}

export default Contents;