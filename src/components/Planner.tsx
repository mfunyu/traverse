import "../styles/components/Planner.scss";
import PlannerCard from "./PlannerCard";
import Modal from "./Modal";
import { TripObject } from "../types/trip";
import { PlanObject } from "../types/plan";

type Props = {
  trip: TripObject;
}

/* Time must be always 00:00:00, edit if adding time related features */
function isNotNextDay(date1: Date, date2: Date) {
  const timeDiff = date2.getTime() - date1.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return dayDiff > 1;
}

function PlannerLists ({ trip }: Props) {
  let totalIndex = 1;
  let prevDate: Date | null = null;

  return (
    <div className="lists">
      {trip.plans.map((plan) => {
        const prevIndex = totalIndex;
        totalIndex += plan.destinations.length;

        let fillerComponent = null;
        if (prevDate && isNotNextDay(prevDate, plan.date)) {
          const startDate = new Date(prevDate.getTime() + (24 * 60 * 60 * 1000));
          const endDate = isNotNextDay(startDate, plan.date) ? new Date(plan.date.getTime() - (24 * 60 * 60 * 1000)) : null;
          const emptyPlan = {
            date: startDate,
            endDate: endDate,
            destinations: [],
          };
          fillerComponent = <PlannerCard plan={emptyPlan} index={prevIndex}/>;
        }
        prevDate = plan.endDate ? plan.endDate : plan.date;

        return (<>{fillerComponent}<PlannerCard plan={plan} index={prevIndex}/></>);
      })}
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
  },
  {
    date: new Date(new Date().getTime() + (8 * 24 * 60 * 60 * 1000)),
    endDate: new Date(new Date().getTime() + (9 * 24 * 60 * 60 * 1000)),
    destinations: [{
      label: "Paris2",
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