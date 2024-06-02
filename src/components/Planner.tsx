import React from "react";
import "../styles/Planner.scss";
import PlannerItem from "./PlannerItem";

function PlannerLists () {
  return (
    <div className="lists">
      <PlannerItem />
      <PlannerItem />
      <PlannerItem />
      <PlannerItem />
      <PlannerItem />
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