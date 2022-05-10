import QuizHeading from "./QuizQuestion";
import Button from "./Button";
import React from "react";
import { nanoid } from "nanoid";
// import CheckButton from "./CheckButton";
function QuizBox(props) {
  // if (componentId === null) {
  const componentId = props.componentId;
  // }
  // console.log("Component ID = ", componentId);
  // const state = props.state;
  // const btnState = props.btnState;
  React.useEffect(function () {
    let initial = null;
    initial = props.incorrect.map((ele) => {
      let btnId = nanoid();
      return {
        id: btnId,
        isClicked: false,
        isCorrect: false,
        option: ele,
      };
    });
    let btnId = nanoid();
    initial.push({
      id: btnId,
      isClicked: false,
      isCorrect: true,
      option: props.correct,
    });
    initial.push(componentId);
    props.setBtnState(function (oldState) {
      if (oldState) {
        oldState.push(initial);
        return oldState;
      } else return [initial];
    });
  }, []);

  function handleClick(e) {
    const clickedButtonId = e.target.id;
    // console.log("clicked button id = ", clickedButtonId);
    const parent = e.target.parentNode;
    // console.log("Parent node of button = ", parent);
    for (let i = 0; i < parent.childNodes.length; i++) {
      if (parent.childNodes[i].id !== clickedButtonId) {
        parent.childNodes[i].className = "quiz--button";
      } else parent.childNodes[i].className = "quiz--button--selected";
    }

    // console.log("Component id = ", componentId);
    // console.log("btnState = ", props.btnState);

    props.setBtnState(function (oldState) {
      let AllbtnState = [];
      let currBtnState; // array of the buttons row being clicked
      let i = 0;
      for (; i < oldState.length; i++) {
        const oldStateArray = oldState[i];
        if (oldStateArray[oldStateArray.length - 1] === componentId) {
          currBtnState = oldStateArray;
          // break;
        } else AllbtnState.push(oldStateArray);
      }
      // Used to add additional btnState
      while (i < oldState.length) {
        const oldStateArray = oldState[i];
        AllbtnState.push(oldStateArray);
        i++;
      }

      // const arr = currBtnState.map((ele) => {
      //   // for converting the state of the current button selected
      //   const currBtnObj = ele;
      //   if (typeof currBtnObj === "object") {
      //     if (currBtnObj.id === clickedButtonId) {
      //       // console.log(e.target);
      //       if (e.target.className === "quiz--button--selected")
      //         e.target.className = "quiz--button";
      //       else e.target.className = "quiz--button--selected";
      //       return {
      //         ...currBtnObj,
      //         isClicked: !ele.isClicked,
      //       };
      //     }
      //     return {
      //       ...currBtnObj,
      //       // isClicked: false,
      //     };
      //   } else return currBtnObj;
      // });
      // AllbtnState.push(arr);
      console.log("All updated btn state = ", AllbtnState);
      return AllbtnState;
    });
    // props.setBtnState(function (oldStatte) {});

    // props.setBtnState(function (oldState) {
    //   let currBtnState;
    //   let btnState = [];
    //   // console.log("oldstate = ", oldState);
    //   for (let i = 0; i < oldState.length; i++) {
    //     let temp = oldState[i];
    //     // console.log("temp = ", temp);
    //     if (temp[temp.length - 1] === componentId) {
    //       currBtnState = temp;
    //       break;
    //     } else btnState.push(temp);
    //   }

    //   const arr = currBtnState.map((ele) => {
    //     if (typeof ele === "object") {
    //       if (clickedButtonId === ele.id) {
    //         if (e.target.className === "quiz--button--selected")
    //           e.target.className = "quiz--button";
    //         else e.target.className = "quiz--button--selected";
    //         return {
    //           ...ele,
    //           isClicked: !ele.isClicked,
    //         };
    //       }
    //       return {
    //         ...ele,
    //         isClicked: false,
    //       };
    //     }
    //     return ele;
    //   });
    //   btnState.push(arr);
    //   return btnState;
    // });
  }

  return (
    <>
      {props.btnState && (
        <div className="quiz-wrapper quiz--ques">
          <QuizHeading question={props.question} />
          <div className="btn">
            <Button
              btnState={props.btnState}
              handleClick={handleClick}
              componentId={componentId}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default QuizBox;
