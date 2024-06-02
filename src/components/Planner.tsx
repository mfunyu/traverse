import React from "react";
import "../styles/Planner.css";

function PlannerItem () {
  return (
    <div className="item">
      <div className="item-header">
        <h3>Day 1</h3>
      </div>
      <div className="item-body">
        <p>Visit the Eiffel Tower</p>
        <p>Visit the Louvre Museum</p>
        <p>Visit the Notre Dame Cathedral</p>
      </div>
    </div>
  );
}

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