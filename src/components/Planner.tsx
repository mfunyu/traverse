import React, { useContext, useState } from "react";
import "../styles/components/Planner.scss";
import PlannerCard from "./PlannerCard";
import { TripObject } from "../types/trip";
import { PlansContext } from "./PlansContext";

type Props = {
  trip: TripObject;
}

/* Time must be always 00:00:00, edit if adding time related features */
function isNotNextDay(date1: Date, date2: Date) {
  const timeDiff = date2.getTime() - date1.getTime();
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return dayDiff > 1;
}

function PlannerLists () {
  const plans = useContext(PlansContext);
  let totalIndex = 1;
  let prevDate: Date | null = null;
  const [modalOpen, setModalOpen] = useState(true);

  function handleCloseModal() {
    setModalOpen(false);
  }

  return (
    <>
      {/* {modalOpen && <Modal dest={trip.planController.plans[0].destinations[0]} onClose={handleCloseModal}/>} */}
      <div className="lists">
        {plans.map((plan) => {
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

  console.log("Planner.tsx: trip", trip);
  return (
    <>
      <div className="planner">
        <div className="contents">
          <PlannerHeader trip={trip}/>
          <PlannerLists />
        </div>
      </div>
    </>
  );
}

export default Planner;