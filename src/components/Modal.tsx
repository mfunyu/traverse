import "../styles/components/Modal.scss";
import { DestinationObject } from "../types/destination";

type ChildProps = {
  label: string;
  placeholder: string;
  type: string;
}

type Props = {
  dest: DestinationObject;
}

function InputField({ label, placeholder, type }: ChildProps) {
  return (
    <div className="input-field">
      <h4 className="label">{label}</h4>
      <input
        /* value={name}
        onChange={(e) => setName(e.target.value)} */
        placeholder={placeholder}
        type={type}
        min="0"
      />
    </div>
  );
}

function Modal({ dest }: Props) {
/*   const [name, setName] = useState(destination.name);
  const [address, setAddress] = useState(destination.address);

  const handleSave = () => {
    onSave({ ...destination, name, address });
    onClose();
  }; */

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button"/*  onClick={onClose} */>
          &times;
        </span>
        <h2>{dest.label}</h2>
        <p>{dest.address}</p>
        <InputField label="Display name" placeholder="Lyon" type="text"/>
        <InputField label="Arrival date" placeholder="undefined" type="date"/>
        <InputField label="Length of stay" placeholder="0" type="number"/>
        <InputField label="Notes" placeholder="add notes" type="text"/>
        <div className="modal-footer">
          <button /* onClick={onClose} */ className="modal-button">
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

export default Modal;