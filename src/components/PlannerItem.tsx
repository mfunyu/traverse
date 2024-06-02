import React from "react";
import "../styles/PlannerItem.scss";

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

export default PlannerItem;