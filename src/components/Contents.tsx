import { useEffect, useReducer } from "react";
import { TripObject } from "../types/trip";
import Map from "./Map";
import Planner from "./Planner";
import { PlansContext, PlansDispatchContext } from "./PlansContext";
import NavigationBar from "./NavigationBar";
import { plansReducer } from "../reducer/PlansReducer";
import Plans from "../class/Plans";

function Contents({ trip }: { trip: TripObject }) {

  const LOCAL_STORAGE_KEY = "road_trip_plans";

  // Load initial state from local storage or trip.plans
  const initPlans = () => {
    const savedItinerary = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedItinerary) {
      const plans = Plans.fromJSON(JSON.parse(savedItinerary));
      console.log("Saved Itinerary", plans);
      return plans;
    }
    return trip.plans;
  };
  const [plans, dispatch] = useReducer(plansReducer, undefined, initPlans);

  // Save itinerary to Local Storage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

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