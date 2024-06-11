import React, { useContext } from "react";
import "../styles/components/Planner.scss";
import PlannerCard from "./PlannerCard";
import { TripObject } from "../types/trip";
import { PlansContext } from "./PlansContext";
import Plan from "../class/Plan";
import { calcNdaysFromDate, isNotNextDay } from "../utils/dateUtils";

type Props = {
  plan: Plan;
  prevDate: Date;
  prevIndex: number;
}

function PlannerFiller({ plan, prevDate, prevIndex }: Props) {
  const startDate = calcNdaysFromDate(prevDate, 1);
  const endDate = isNotNextDay(startDate, plan.date) ? calcNdaysFromDate(plan.date, -1) : null;
  const emptyPlan = new Plan(startDate, endDate, []);
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
  if (!plans)
    throw new Error("PlansContext is not provided");

  let prevIndex = 1;
  let prevDate: Date;

  return (
    <>
      <div className="lists">
        {plans.plans.map((plan, index) => {
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