import React from "react";
import "../styles/components/PlannerCard.scss";

function PlannerItem () {
  return (
    <div className="item">
      <div className="circle-number">1</div>
      <div className="details">
        <h4>Lyon</h4>
        <p>69100</p>
      </div>
    </div>
  );
}

function PlannerCard () {
  const isStay = true;
  const cardType = isStay ? "card-stay" : "card";
  return (
    <div className={cardType}>
      <h3>Wednesday</h3>
      <PlannerItem />
      <PlannerItem />
      <div className="item-body">
      </div>
    </div>
  );
}

export default PlannerCard;