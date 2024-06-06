import "../styles/components/PlannerCard.scss";
import { DestinationObject } from "../types/destination";
import { PlanObject } from "../types/plan";

type Props = {
  plan: PlanObject;
  index: number;
}

type ChildProps = {
  dest: DestinationObject;
  index: number;
}

function PlannerItem ({ dest, index }: ChildProps) {
  return (
    <div className="item">
      <div className="circle-number">{index}</div>
      <div className="details">
        <h4>{dest.customLabel ? dest.customLabel : dest.label}</h4>
        <p>{dest.address}</p>
      </div>
    </div>
  );
}

function getDateString (date: Date) {
  return date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" });
}

function PlannerEmptyCard ({ plan, index }: Props) {
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

function PlannerStayCard ({ plan, index }: Props) {
  const startDateString = getDateString(plan.date);
  const endDateString = getDateString(plan.endDate || new Date()); // endDate is never null, need to change the type

  return (
    <div className="card-stay">
      <div className="tag">stay</div>
      <h3>{startDateString} - {endDateString}</h3>
      {plan.destinations.length && <PlannerItem dest={plan.destinations[0]} index={index}/>}
      <div className="item-body">
      </div>
    </div>
  );
}

function PlannerOneDayCard ({ plan, index }: Props) {
  const dateString = getDateString(plan.date);

  return (
    <div className="card">
      <h3>{dateString}</h3>
      {plan.destinations.length && plan.destinations.map((dest) => <PlannerItem dest={dest} index={index++}/>)}
      <div className="item-body">
      </div>
    </div>
  );
}

function PlannerCard ({ plan, index }: Props) {
  if (plan.destinations.length === 0) {
    return <PlannerEmptyCard plan={plan} index={index}/>;
  }
  return plan.endDate ? <PlannerStayCard plan={plan} index={index}/> : <PlannerOneDayCard plan={plan} index={index}/>;
}

export default PlannerCard;