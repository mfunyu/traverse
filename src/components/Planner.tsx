import React, { useContext, useState } from "react";
import "../styles/components/Planner.scss";
import PlannerCard from "./PlannerCard";
import { TripObject } from "../types/trip";
import { PlansContext } from "./PlansContext";
import { PlanObject } from "../types/plan";

type Props = {
  plan: PlanObject;
  prevDate: Date;
  prevIndex: number;
}

/* Time must be always 00:00:00, edit if adding time related features */
function isNotNextDay(date1: Date, date2: Date) {
  const timeDiff = Math.floor(date2.getTime() / 1000) - Math.floor(date1.getTime() / 1000);
  const oneDay = 60 * 60 * 24;

  return timeDiff > oneDay;
}

function calcNdaysFromDate(date: Date, n: number) {
  return new Date(date.getTime() + (n * 24 * 60 * 60 * 1000));
}

function PlannerFiller({ plan, prevDate, prevIndex }: Props) {
  const startDate = calcNdaysFromDate(prevDate, 1);
  const endDate = isNotNextDay(startDate, plan.date) ? calcNdaysFromDate(plan.date, -1) : null;
  const emptyPlan = {
    date: startDate,
    endDate: endDate,
    destinations: [],
  };
  return <PlannerCard plan={emptyPlan} key="empty" index={prevIndex} />;
}

function PlannerCardDisplay({ plan, prevDate, prevIndex }: Props) {
  const isDisplayFiller = prevDate && isNotNextDay(prevDate, plan.date);

  return (
    <React.Fragment>
      {isDisplayFiller && <PlannerFiller key="empty" plan={plan} prevDate={prevDate} prevIndex={prevIndex} />}
      <PlannerCard key="normal" plan={plan} index={prevIndex} />
    </React.Fragment>
  );
}

function PlannerLists () {
  const plans = useContext(PlansContext);
  let prevIndex = 1;
  let prevDate: Date;

  return (
    <>
      <div className="lists">
        {plans.map((plan, index) => {
          const prevIndexSave = prevIndex;
          prevIndex += plan.destinations.length;
          const prevDateSave = prevDate;
          prevDate = plan.endDate ? plan.endDate : plan.date;
          return <PlannerCardDisplay plan={plan} key={index} prevDate={prevDateSave} prevIndex={prevIndexSave} />;
        })}
      </div>
    </>
  );
}

function Planner({ trip }: { trip: TripObject }) {

  console.log("Planner.tsx: trip", trip);
  return (
    <>
      <div className="planner">
        <div className="contents">
          <div className="header">
            <h2>{trip.label}</h2>
          </div>
          <PlannerLists />
        </div>
      </div>
    </>
  );
}

export default Planner;