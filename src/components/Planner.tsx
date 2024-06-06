import React from "react";
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
    <>
      {/* <Modal dest={trip.plans[0].destinations[0]} /> */}
      <div className="lists">
        {trip.planController.plans.map((plan) => {
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
            fillerComponent = <PlannerCard plan={emptyPlan} key="empty" index={prevIndex} />;
          }
          prevDate = plan.endDate ? plan.endDate : plan.date;

          return (
            <React.Fragment key={prevIndex}>
              {fillerComponent}
              <PlannerCard plan={plan} key="normal" index={prevIndex} />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}

function PlannerHeader ({ trip }: Props) {
  return (
    <div className="header">
      <h2>{trip.label}</h2>
    </div>
  );
}

function Planner ({ trip }: Props) {


  return (
    <>
      <div className="planner">
        <div className="contents">
          <PlannerHeader trip={trip}/>
          <PlannerLists trip={trip} />
        </div>
      </div>
    </>
  );
}

export default Planner;