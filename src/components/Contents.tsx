import { useState } from "react";
import { TripObject } from "../types/trip";
import Map from "./Map";
import Planner from "./Planner";
import { DestinationObject } from "../types/destination";

function Contents({ trip }: { trip: TripObject }) {

  const [plans, setPlans] = useState(trip.planController.plans);

  function handleAddDestination(newDest: DestinationObject) {
    console.log(trip.planController.plans);
    trip.planController.addDestination(newDest);
    setPlans(trip.planController.plans);
    console.log(plans);
  }

  return (
    <div>
      <Planner trip={trip}/>
      <Map trip={trip} onAddDestination={handleAddDestination}/>
    </div>
  );
}

export default Contents;