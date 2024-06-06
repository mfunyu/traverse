import "../styles/components/Planner.scss";
import PlannerCard, { PlannerStayCard } from "./PlannerCard";
import Modal from "./Modal";
import { DestinationObject } from "../types/destination";
import { TripObject } from "../types/trip";
import { PlanObject } from "../types/plan";

type Props = {
  trip: TripObject;
}

function PlannerLists ({ trip }: Props) {
  let totalIndex = 1;
  return (
    <div className="lists">
      {trip.plans.map((plan) => {
        const prevIndex = totalIndex;
        totalIndex += plan.destinations.length;
        return (
          plan.endDate ? <PlannerStayCard plan={plan} index={prevIndex}/> :
            <PlannerCard plan={plan} index={prevIndex}/>);
      })
      }
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
  const plans: PlanObject[] = [{
    date: new Date(),
    endDate: null,
    destinations: [{
      label: "Lyon",
      latLang: [51.505, -0.09],
      address: "69100",
      customLabel: null,
      arrivalDate: new Date(),
      lengthOfStay: 0,
      notes: null,
    }]
  },
  {
    date: new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000)),
    endDate: null,
    destinations: [{
      label: "Marceille",
      latLang: [51.505, -0.09],
      address: "80 rue de la république, 59100",
      customLabel: null,
      arrivalDate: new Date(),
      lengthOfStay: 3,
      notes: null,
    },
    {
      label: "Nice",
      latLang: [51.505, -0.09],
      address: "33 rue de la république, 34100",
      customLabel: null,
      arrivalDate: new Date(),
      lengthOfStay: 0,
      notes: null,
    }]
  },
  {
    date: new Date(new Date().getTime() + (3 * 24 * 60 * 60 * 1000)),
    endDate: new Date(new Date().getTime() + (6 * 24 * 60 * 60 * 1000)),
    destinations: [{
      label: "Paris",
      latLang: [51.505, -0.09],
      address: "21 avenue des champs elysées, 75000",
      customLabel: null,
      arrivalDate: new Date(),
      lengthOfStay: 1,
      notes: "This is a note",
    }]
  }];

  const trips: TripObject[] = [{
    label: "Trip to Paris!",
    plans: plans,
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