import { useContext, useState } from "react";
import "../styles/components/NavigationBar.scss";
import { PlansDispatchContext } from "../context/PlansContext";
import WarningModal from "./modal/WarningModal";
import { PlansActionType } from "../reducer/PlansReducer";

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
    if (!dispatch)
      throw new Error("usePlansDispatch must be used within a PlansProvider");
    dispatch({ type: PlansActionType.CLEAR });
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
