import React, { useState } from "react";

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
        <h2>Modifier la destination</h2>
        <input
          /* value={name}
          onChange={(e) => setName(e.target.value)} */
          className="modal-input"
        />
        <input
          /* value={address}
          onChange={(e) => setAddress(e.target.value)} */
          className="modal-input"
        />
        <button /* onClick={handleSave} */ className="modal-button">
          Enregistrer
        </button>
        <button /* onClick={onClose} */ className="modal-button">
          Annuler
        </button>
      </div>
    </div>
  );
}

export default Modal;