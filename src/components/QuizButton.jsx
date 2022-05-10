// import { nanoid } from "nanoid";
// import React from "react";

// function QuizButton(props) {
//   React.useEffect(function initialize() {
//     let initial = [];
//     initial = props.ele.incorrect_answers.map((ele) => {
//       let btnId = nanoid();
//       return {
//         id: btnId,
//         isClicked: false,
//         isCorrect: false,
//         button: (
//           <button
//             type="button"
//             className="quiz--button"
//             key={btnId}
//             id={btnId}
//             onClick={handleClick}
//           >
//             {ele}
//           </button>
//         ),
//       };
//     });

//     let btnId = nanoid();
//     initial.push({
//       id: btnId,
//       isClicked: false,
//       isCorrect: true,
//       button: (
//         <button
//           type="button"
//           className="quiz--button"
//           key={btnId}
//           id={btnId}
//           onClick={handleClick}
//         >
//           {props.ele.correct_answer}
//         </button>
//       ),
//     });
//     props.setBtnState(function (oldState) {
//       if (oldState) {
//         oldState.push(initial);
//         return oldState;
//       } else return initial;
//     });
//   }, []);

//   function handleClick(e) {
//     const clickedButtonId = e.target.id;
//     const parent = e.target.parentNode;
//     for (let i = 0; i < parent.childNodes.length; i++) {
//       if (parent.childNodes[i].id !== clickedButtonId) {
//         parent.childNodes[i].className = "quiz--button";
//       }
//     }
//     props.setBtnState(function (oldState) {
//       return oldState.map((ele) => {
//         return ele.map((btn) => {
//           if (clickedButtonId === btn.id) {
//             if (e.target.className === "quiz--button--selected")
//               e.target.className = "quiz--button";
//             else e.target.className = "quiz--button--selected";
//             return {
//               ...btn,
//               isClicked: !btn.isClicked,
//             };
//           }
//           return {
//             ...btn,
//             isClicked: false,
//           };
//         });
//       });
//     });
//   }
//   console.log(props.btnState);
//   const buttons = props.btnState
//     ? props.btnState.map((ele) => {
//         return ele.map((btn) => {
//           return btn.button;
//         });
//       })
//     : "";
//   console.log(buttons);

//   return (
//     <>
//       <h1>Hello </h1>
//       {buttons}
//     </>
//   );
// }
// export default QuizButton;
