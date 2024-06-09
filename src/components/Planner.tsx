import React, { useContext, useState } from "react";
import "../styles/components/Planner.scss";
import PlannerCard from "./PlannerCard";
import { TripObject } from "../types/trip";
import { PlansContext } from "./PlansContext";
import { PlanObject } from "../types/plan";

type Props = {
  plan: PlanObject;
  prevDate: Date | null;
  prevIndex: number;
}

/* Time must be always 00:00:00, edit if adding time related features */
function isNotNextDay(date1: Date, date2: Date) {
  const timeDiff = date2.getTime() - date1.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return dayDiff > 1;
}

function PlannerCardDisplay({ plan, prevDate, prevIndex }: Props) {
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

  return (
    <React.Fragment>
      {fillerComponent}
      <PlannerCard plan={plan} key="normal" index={prevIndex} />
    </React.Fragment>
  );
}

function PlannerLists () {
  const plans = useContext(PlansContext);
  let prevIndex = 1;
  let prevDate: Date | null = null;
  const [modalOpen, setModalOpen] = useState(true);

  function handleCloseModal() {
    setModalOpen(false);
  }

  return (
    <>
      {/* {modalOpen && <Modal dest={trip.planController.plans[0].destinations[0]} onClose={handleCloseModal}/>} */}
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

function PlannerHeader({ tripName }: { tripName: string }) {
  return (
    <div className="header">
      <h2>{tripName}</h2>
    </div>
  );
}

function Planner({ trip }: { trip: TripObject }) {

  console.log("Planner.tsx: trip", trip);
  return (
    <>
      <div className="planner">
        <div className="contents">
          <PlannerHeader tripName={trip.label} />
          <PlannerLists />
        </div>
      </div>
    </>
  );
}

export default Planner;