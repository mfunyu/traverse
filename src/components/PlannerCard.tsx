import "../styles/components/PlannerCard.scss";
import { DestinationObject } from "../types/destination";

type Props = {
  dest: DestinationObject;
  }

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

function getDateString (date: Date) {
  return date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long" });
}

export function PlannerStayCard ({ dest }: Props) {
  const startDateString = getDateString(dest.arrivalDate);
  const endDateString = getDateString(new Date(dest.arrivalDate.getTime() + dest.lengthOfStay * 24 * 60 * 60 * 1000));

  return (
    <div className="card-stay">
      <div className="tag">stay</div>
      <h3>{startDateString} - {endDateString}</h3>
      <PlannerItem />
      <PlannerItem />
      <div className="item-body">
      </div>
    </div>
  );
}

function PlannerCard ({ dest }: Props) {
  const dateString = getDateString(dest.arrivalDate);

  return (
    <div className="card">
      <h3>{dateString}</h3>
      <PlannerItem />
      <PlannerItem />
      <div className="item-body">
      </div>
    </div>
  );
}

export default PlannerCard;