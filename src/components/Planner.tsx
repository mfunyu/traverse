import React from "react";
import "../styles/components/Planner.scss";
import PlannerCard, { PlannerStayCard } from "./PlannerCard";

function PlannerLists () {
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

function PlannerHeader () {
  return (
    <div className="header">
      <h2>Trip to Paris</h2>
    </div>
  );
}

function Planner () {
  return (
    <div className="planner">
      <div className="contents">
        <PlannerHeader/ >
        <PlannerLists />
      </div>
    </div>
  );
}

export default Planner;