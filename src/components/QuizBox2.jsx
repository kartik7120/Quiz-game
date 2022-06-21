// import { nanoid } from "nanoid";
import React from "react";
import QuizHeading from "./QuizQuestion";
import Button from "./Button";
function QuizBox(props) {
  function handleClick(e) {
    const buttonParent = e.target.parentNode;
    const buttonParentChildren = buttonParent.childNodes;
    const targetButton = e.target;

    for (let i = 0; i < buttonParentChildren.length; i++) {
      if (buttonParentChildren[i].id === targetButton.id) {
        buttonParentChildren[i].className = "quiz--button--selected";
      } else buttonParentChildren[i].className = "quiz--button";
    }
  }
  return (
    <>
      <div className="quiz-wrapper quiz--ques">
        {/* Heading for questions */}
        <QuizHeading question={props.question} />
        <div className="btn">
          {/* Quiz buttons */}
          <Button options={props.options} handleClick={handleClick} />
        </div>
      </div>
    </>
  );
}
export default QuizBox;
