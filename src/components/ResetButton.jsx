import React from "react";
function ResetButton(props) {
  return (
    <>
      <button type="button" className="reset-btn" onClick={props.handleClick}>
        {props.textContent}
      </button>
    </>
  );
}
export default ResetButton;
