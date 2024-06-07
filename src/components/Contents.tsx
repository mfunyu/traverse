import { TripObject } from "../types/trip";
import Map from "./Map";
import Planner from "./Planner";

function Contents({ trip }: { trip: TripObject }) {



  return (
    <div>
      <Planner trip={trip}/>
      <Map trip={trip}/>
    </div>
  );
}

export default Contents;