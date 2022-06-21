import React from "react";
function CheckButton(props) {
  return (
    <>
      <button type="button" className="check-btn" onClick={props.CheckAnswer}>
        Check answer
      </button>
    </>
  );
}
export default CheckButton;
