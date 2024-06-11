import { useContext, useState } from "react";
import "../styles/components/NavigationBar.scss";
import { PlansDispatchContext } from "./PlansContext";
import WarningModal from "./WarningModal";

function NavigationBar () {
  const dispatch = useContext(PlansDispatchContext);
  const [showWarning, setShowWarning] = useState(false);

  function handleClick() {
    setShowWarning(true);
  }

  function handleCancel() {
    setShowWarning(false);
  }

  function handleConfirm() {
    dispatch({ type: "clear" });
    setShowWarning(false);
  }

  return (
    <>
      {showWarning && <WarningModal
        message="Are you sure you want to clear all destinations?"
        onConfirm={handleConfirm}
        onCancel={handleCancel} />}
      <div className="navbar">
        <div className="brand">Traverse</div>
        <div className="nav-buttons">
          <button onClick={handleClick}>Clear</button>
        </div>
      </div>
    </>
  );
}

export default NavigationBar;
