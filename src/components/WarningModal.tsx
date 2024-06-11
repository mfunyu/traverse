import React from "react";
import "../styles/components/Modal.scss";

interface WarningModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function WarningModal({ message, onConfirm, onCancel }: WarningModalProps) {
  return (
    <div className="warning-modal">
      <div className="modal-content">
        <h2>Warning</h2>
        <p>{message}</p>
        <div className="modal-footer">
          <button className="modal-button" onClick={onCancel}>x Cancel</button>
          <button className="modal-button-delete" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default WarningModal;
