import { ChangeEvent, useContext, useState } from "react";
import Destination from "../class/Destination";
import "../styles/components/Modal.scss";
import { PlansContext, PlansDispatchContext } from "./PlansContext";
import { getLocalDateString } from "../utils/dateUtils";

type InputFieldProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string;
  placeholder: string;
  type: string;
  required: boolean;
  value: string;
}

type Props = {
  dest: Destination;
  onClose: () => void;
}

function InputField({ onChange, value, label, placeholder, type, required = false }: InputFieldProps) {

  return (
    <div className="input-field">
      <h4 className="label">{label}</h4>
      <input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        min="0"
        required={required}
        value={value}
      />
    </div>
  );
}

type ModalProps = {
  onClose: () => void;
  displayData: Destination;
  mode: "add" | "modify";
  onDelete?: () => void;
}

function Modal({ onClose, displayData, mode, onDelete }: ModalProps) {
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
    let newDest;
    if (mode === "add") {
      newDest = displayData;
    } else {
      newDest = Destination.deepCopy(displayData);
    }

    if (!plans.isValidDate(arrivalDate, lengthOfStay, newDest.id)) {
      setShowError(true);
      setErrorMsg("Date overlaps with an existing plan");
      return;
    }

    newDest.customLabel = customName;
    newDest.arrivalDate = arrivalDate;
    newDest.lengthOfStay = lengthOfStay;
    newDest.notes = notes;

    setShowError(false);
    if (mode === "modify") {
      if (newDest.arrivalDate !== displayData.arrivalDate ||
        newDest.lengthOfStay !== displayData.lengthOfStay) {
        dispatch({ type: "replace", newDest: newDest });
      } else {
        dispatch({ type: "modify", newDest: newDest });
      }
    } else if (mode === "add") {
      dispatch({ type: "add", newDest: newDest });
    }
    onClose();
  }

  const dateValue = arrivalDate ? getLocalDateString(arrivalDate) : "";

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{displayData.label}</h2>
        <p>{displayData.address}</p>
        <InputField
          onChange={(e) => setArrivalDate(new Date(e.target.value))}
          value={dateValue}
          label="Arrival date"
          placeholder="undefined"
          type="date"
          required={true} />
        <InputField
          onChange={(e) => setCustomName(e.target.value)}
          value={customName ? customName : ""}
          label="Custom name"
          placeholder="Lyon"
          type="text"
          required={false} />
        <InputField
          onChange={(e) => setLengthOfStay(Number(e.target.value))}
          value={lengthOfStay.toString()}
          label="Length of stay"
          placeholder="0"
          type="number"
          required={false} />
        <InputField
          onChange={(e) => setNotes(e.target.value)}
          value={notes ? notes : ""}
          label="Notes"
          placeholder="add notes"
          type="text"
          required={false} />
        {showError && <p className="error-message">Error: {errorMsg}</p>}
        <div className="modal-footer">
          {mode === "add" && <button onClick={onClose} className="modal-button">
            - cancel
          </button>}
          {mode === "modify" && <button onClick={onDelete} className="modal-button-delete">
            x delete
          </button>}
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
  const dispatch = useContext(PlansDispatchContext);

  function handleDelete() {
    dispatch({ type: "delete", newDest: dest });
    onClose();
  }
  return <Modal mode="modify" onClose={onClose} displayData={dest} onDelete={handleDelete}/>;
}

export function AddModal({ latLng, label, onClose }: Props1) {
  const displayData = new Destination(label, latLng, "", new Date(), 0, "");

  return <Modal mode="add" onClose={onClose} displayData={displayData} />;
}
