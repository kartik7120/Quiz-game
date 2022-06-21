import { nanoid } from "nanoid";
import React from "react";

function Button(props) {
  const options = props.options;
  return (
    <>
      {options.map((option, index) => {
        return (
          <button
            type="button"
            className="quiz--button"
            key={nanoid()}
            id={nanoid()} // id to recognize each button
            onClick={props.handleClick} // on click event for clicking a button
          >
            {option}
          </button>
        );
      })}
    </>
  );
}
export default Button;