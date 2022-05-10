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
// {currBtnState &&
//   currBtnState.map((ele) => {
//     return (
//       <button
//         type="button"
//         className="quiz--button"
//         onClick={props.handleClick}
//         id={ele.id}
//         key={ele.id}
//       >
//         {ele.option}
//       </button>
//     );
//   })}

// let currBtnState;
// if (props.btnState) {
//   const btnState = props.btnState;
//   const componentId = props.componentId;
//   console.log("btnstate = ", btnState);
//   btnState.map((ele) => {
//     let length = ele.length;
//     if (ele[length - 1] === componentId) {
//       currBtnState = ele;
//     }
//     return -1;
//   });
// }
