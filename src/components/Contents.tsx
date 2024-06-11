import { useReducer } from "react";
import { TripObject } from "../types/trip";
import Map from "./Map";
import Planner from "./Planner";
import { PlansContext, PlansDispatchContext } from "./PlansContext";
import NavigationBar from "./NavigationBar";
import { plansReducer } from "../reducer/PlansReducer";

function Contents({ trip }: { trip: TripObject }) {
  const [plans, dispatch] = useReducer(plansReducer, trip.plans);

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