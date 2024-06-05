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

export function PlannerStayCard () {
  return (
    <div className="card-stay">
      <div className="tag">stay</div>
      <h3>Wednesday</h3>
      <PlannerItem />
      <PlannerItem />
      <div className="item-body">
      </div>
    </div>
  );
}

function PlannerCard () {
  return (
    <div className="card">
      <h3>Wednesday</h3>
      <PlannerItem />
      <PlannerItem />
      <div className="item-body">
      </div>
    </div>
  );
}

export default PlannerCard;