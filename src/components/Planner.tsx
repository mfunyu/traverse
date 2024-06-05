import "../styles/components/Planner.scss";
import PlannerCard, { PlannerStayCard } from "./PlannerCard";
import Modal from "./Modal";
import { DestinationObject } from "../types/destination";
import { TripObject } from "../types/trip";

type Props = {
  trip: TripObject;
}

function PlannerLists ({ trip }: Props) {

  return (
    <div className="lists">
      <PlannerCard />
      <PlannerStayCard />
      <PlannerCard />
      <PlannerCard />
      <PlannerCard />
    </div>
  );
}

function PlannerHeader ({ trip }: Props) {
  return (
    <div className="header">
      <h2>{trip.label}</h2>
    </div>
  );
}

function Planner () {

  const destinations: DestinationObject[] = [{
    label: "Lyon",
    latLang: [51.505, -0.09],
    address: "69100",
    order: 1,
    customLabel: null,
    arrivalDate: new Date(),
    lengthOfStay: 0,
    notes: null,
  }];

  const trips: TripObject[] = [{
    label: "Trip to Paris!",
    destinations: destinations,
  }];

  const currentTrip = trips[0];

  return (
    <>
      {/* <Modal /> */}
      <div className="planner">
        <div className="contents">
          <PlannerHeader trip={currentTrip}/>
          <PlannerLists trip={currentTrip} />
        </div>
      </div>
    </>
  );
}

export default Planner;