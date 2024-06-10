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

function Modal({ dest, onClose }: Props) {
/*   const [name, setName] = useState(destination.name);
  const [address, setAddress] = useState(destination.address);

  const handleSave = () => {
    onSave({ ...destination, name, address });
    onClose();
  }; */

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{dest.label}</h2>
        <p>{dest.address}</p>
        {/* <InputField label="Display name" placeholder="Lyon" type="text" required={false}/>
        <InputField label="Arrival date" placeholder="undefined" type="date" required={true}/>
        <InputField label="Length of stay" placeholder="0" type="number" required={false}/>
        <InputField label="Notes" placeholder="add notes" type="text" required={false}/>
       */}  <div className="modal-footer">
          <button onClick={onClose} className="modal-button">
            x remove destination
          </button>
          <button /* onClick={handleSave} */ className="modal-button">
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

export function AddModal({ latLng, label, onClose }: Props1) {
/*   const [name, setName] = useState(destination.name);
  const [address, setAddress] = useState(destination.address);
  const handleSave = () => {
    onSave({ ...destination, name, address });
    onClose();
  };
  */
  const dispatch = useContext(PlansDispatchContext);
  const plans = useContext(PlansContext);
  const [showError, setShowError] = useState(false);

  const [customName, setCustomName] = useState("");
  const [arrivalDate, setArrivalDate] = useState<Date>(new Date());
  const [lengthOfStay, setLengthOfStay] = useState(0);
  const [notes, setNotes] = useState("");

  function handleSubmit () {
    console.log("submit");
    const newDest = new Destination(label, latLng, customName, arrivalDate, lengthOfStay, notes);
    if (!isValidDate(plans, newDest.arrivalDate, newDest.lengthOfStay)) {
      setShowError(true);
      return;
    }
    setShowError(false);
    dispatch({ type: "add", newDest: newDest });
    onClose();
  }

  const name = label.split(",")[0];
  const address = label;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{name}</h2>
        <p>{address}</p>
        <InputField onChange={(e) => setArrivalDate(new Date(e.target.value))} label="Arrival date" placeholder="undefined" type="date" required={true}/>
        <InputField onChange={(e) => setCustomName(e.target.value)} label="Custom name" placeholder="Lyon" type="text" required={false}/>
        <InputField onChange={(e) => setLengthOfStay(Number(e.target.value))} label="Length of stay" placeholder="0" type="number" required={false}/>
        <InputField onChange={(e) => setNotes(e.target.value)} label="Notes" placeholder="add notes" type="text" required={false}/>
        {showError && <p className="error-message">Error: Overlapping Date</p>}
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



export default Modal;