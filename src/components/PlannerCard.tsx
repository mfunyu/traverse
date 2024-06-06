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

export function PlannerStayCard ({ plan, index }: Props) {
  const startDateString = getDateString(plan.date);
  const endDateString = getDateString(plan.endDate || new Date()); // endDate is never null, need to change the type

  return (
    <div className="card-stay">
      <div className="tag">stay</div>
      <h3>{startDateString} - {endDateString}</h3>
      <PlannerItem dest={plan.destinations[0]} index={index}/>
      <div className="item-body">
      </div>
    </div>
  );
}

function PlannerCard ({ plan, index }: Props) {
  const dateString = getDateString(plan.date);

  return (
    <div className="card">
      <h3>{dateString}</h3>
      {plan.destinations.map((dest) => <PlannerItem dest={dest} index={index++}/>)}
      <div className="item-body">
      </div>
    </div>
  );
}

export default PlannerCard;