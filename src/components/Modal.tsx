import React, { useState } from "react";
import "../styles/components/Modal.scss";

function Modal() {
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
        <h2>Lyon</h2>
        <p>69100, 60 Rue Marceille</p>
        <input
          /* value={name}
          onChange={(e) => setName(e.target.value)} */
          placeholder="Lyon"
          className="modal-input"
        />
        <input
          /* value={name}
          onChange={(e) => setName(e.target.value)} */
          placeholder="Not set"
          className="modal-input"
          type="date"
        />
        <input
          /* value={name}
          onChange={(e) => setName(e.target.value)} */
          placeholder="0"
          className="modal-input"
          type="number"
        />
        <input
          /* value={address}
          onChange={(e) => setAddress(e.target.value)} */
          placeholder="Add notes"
          className="modal-input"
        />
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