import { ChangeEvent, useContext, useState } from "react";
import Destination from "../class/Destination";
import "../styles/components/Modal.scss";
import { DestinationObject } from "../types/destination";
import { PlansContext, PlansDispatchContext } from "./PlansContext";
import { isValidDate } from "../class/PlanController";

type InputFieldProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
}

type Props = {
  dest: DestinationObject;
  onClose: () => void;
}

function InputField({ onChange, label, placeholder, type, required = false }: InputFieldProps) {

  return (
    <div className="input-field">
      <h4 className="label">{label}</h4>
      <input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        min="0"
        required={required}
      />
    </div>
  );
}

type ModalProps = {
  onClose: () => void;
  displayData: DestinationObject;
  mode: "add" | "modify";
}

function Modal({ onClose, displayData, mode }: ModalProps) {
  const dispatch = useContext(PlansDispatchContext);
  const plans = useContext(PlansContext);

  const [customName, setCustomName] = useState(displayData.customLabel);
  const [arrivalDate, setArrivalDate] = useState<Date | null>(displayData.arrivalDate);
  const [lengthOfStay, setLengthOfStay] = useState(displayData.lengthOfStay);
  const [notes, setNotes] = useState(displayData.notes);

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit() {
    console.log("submit");
    if (!arrivalDate) {
      setShowError(true);
      setErrorMsg("Arrival date is required");
      return;
    }
    const newDest = new Destination(displayData.label, displayData.latLng, customName, arrivalDate, lengthOfStay, notes);
    if (!isValidDate(plans, newDest.arrivalDate, newDest.lengthOfStay)) {
      setShowError(true);
      setErrorMsg("Date overlaps with an existing plan");
      return;
    }
    setShowError(false);
    if (mode === "modify") {
      dispatch({ type: "modify", dest: newDest });
    } else if (mode === "add") {
      dispatch({ type: "add", newDest: newDest });
    }
    onClose();
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{displayData.label}</h2>
        <p>{displayData.address}</p>
        <InputField onChange={(e) => setArrivalDate(new Date(e.target.value))} label="Arrival date" placeholder="undefined" type="date" required={true} />
        <InputField onChange={(e) => setCustomName(e.target.value)} label="Custom name" placeholder="Lyon" type="text" required={false} />
        <InputField onChange={(e) => setLengthOfStay(Number(e.target.value))} label="Length of stay" placeholder="0" type="number" required={false} />
        <InputField onChange={(e) => setNotes(e.target.value)} label="Notes" placeholder="add notes" type="text" required={false} />
        {showError && <p className="error-message">Error: {errorMsg}</p>}
        <div className="modal-footer">
          <button onClick={onClose} className="modal-button">
            x cancel
          </button>
          <button onClick={handleSubmit} className="modal-button" type="submit">
            save
          </button>
        </div>
      </div>
    </div>
  );
}

type Props1 = {
  latLng: number[];
  label: string;
  onClose: () => void;
}

export function ModificationModal ({ dest, onClose }: Props) {
  return <Modal mode="modify" onClose={onClose} displayData={dest} />;
}

export function AddModal({ latLng, label, onClose }: Props1) {
  const displayData: DestinationObject = {
    label: label.split(",")[0],
    latLng: [latLng[0], latLng[1]],
    address: label,
    customLabel: "",
    arrivalDate: null,
    lengthOfStay: 0,
    notes: "",
  };

  return <Modal mode="add" onClose={onClose} displayData={displayData} />;
}
