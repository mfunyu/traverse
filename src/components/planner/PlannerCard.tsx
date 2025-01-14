import { useState } from "react";
import "../../styles/components/PlannerCard.scss";
import Destination from "../../class/Destination";
import Plan from "../../class/Plan";
import { ModificationModal } from "../modal/Modal";

type PlannerProps = {
  plan: Plan;
  index: number;
}

type ItemProps = {
  dest: Destination;
  index: number;
}

function PlannerItem({ dest, index }: ItemProps) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleCloseModal() {
    setModalOpen(false);
  }
  function handleClick() {
    setModalOpen(true);
  }

  return (
    <>
      {modalOpen && <ModificationModal dest={dest} onClose={handleCloseModal} />}
      <div className="item" onClick={handleClick}>
        <div className="circle-number">{index}</div>
        <div className="details">
          <h4>{dest.customLabel || dest.label}</h4>
          <p>{dest.notes || dest.address}</p>
        </div>
      </div>
    </>
  );
}

function getDateString(date: Date) {
  return date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" });
}

function PlannerEmptyCard({ plan }: PlannerProps) {
  const startDateString = getDateString(plan.date);
  const endDateString = getDateString(plan.endDate || new Date()); // endDate is never null, need to change the type

  return (
    <div className="card">
      {plan.endDate ? <h3>{startDateString} - {endDateString}</h3> : <h3>{startDateString}</h3>}
      <div className="item-body">
      </div>
    </div>
  );
}

function PlannerStayCard({ plan, index }: PlannerProps) {
  const startDateString = getDateString(plan.date);
  const endDateString = getDateString(plan.endDate || new Date()); // endDate is never null, need to change the type

  return (
    <div className="card-stay">
      <div className="tag">stay</div>
      <h3>{startDateString} - {endDateString}</h3>
      <PlannerItem dest={plan.destinations[0]} index={index} />
      <div className="item-body">
      </div>
    </div>
  );
}

function PlannerOneDayCard({ plan, index }: PlannerProps) {
  const dateString = getDateString(plan.date);

  return (
    <div className="card">
      <h3>{dateString}</h3>
      {plan.destinations.length && plan.destinations.map((dest) => <PlannerItem dest={dest} key={index} index={index++} />)}
      <div className="item-body">
      </div>
    </div>
  );
}

function PlannerCard({ plan, index }: PlannerProps) {
  if (plan.destinations.length === 0) {
    return <PlannerEmptyCard plan={plan} index={index} />;
  }
  if (plan.endDate) {
    return <PlannerStayCard plan={plan} index={index} />;
  }
  return <PlannerOneDayCard plan={plan} index={index} />;
}

export default PlannerCard;