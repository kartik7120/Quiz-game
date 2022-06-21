import React from "react";
import CheckButton from "./CheckButton";
import { nanoid } from "nanoid";
import ResetButton from "./ResetButton";
import QuizBox2 from "./QuizBox2";
// import { Suspense } from "react";
// import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
// const QuizBoxComponent = React.lazy(() => {
//   return import("./QuizBox2");
// });
// import Random from "./Random";

// const random = () => Math.floor(Math.randon() * 3) + 1;

//  Fisher-Yates (aka Knuth) Shuffle algorithm for suffling a array
// Used for shuffling the options array

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function decodeHTMLText(txt) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = txt;
  return textArea.value;
}

let correctAnswers = []; // global array for checking answers

function Quiz(props) {
  const [state, setState] = React.useState(null); // state for the data of the quiz
  const [btnState, setBtnState] = React.useState(false); // state for each button in the quiz
  const [errorState, setErrorState] = React.useState(null);
  React.useEffect(
    function () {
      try {
        fetch(
          "https://opentdb.com/api.php?amount=4&category=31&difficulty=easy&type=multiple"
        )
          .then((JSON) => JSON.json())
          .then((data) => {
            const arr = data.results.map((ele) => {
              return {
                ...ele,
                key: nanoid(),
              };
            });
            console.log("Value of arr in React.useEffect = ", arr);
            setState(arr);
            setErrorState(null);
          })
          .catch((err) => {
            console.log(
              "Something went wrong while fetching from React.useEffect = ",
              err
            );
            setErrorState(err);
          });
      } catch (error) {
        console.log(
          "Something went wrong while fetching from React.useEffect = ",
          error
        );
      }
    },
    [btnState]
  );

  function handleClick(e) {
    const checkButton = document.querySelector(".check-btn");
    if (!errorState) checkButton.disabled = false;
    setBtnState(function (oldState) {
      return !oldState;
    });
    setErrorState(null);
  }

  function CheckAnswer(e) {
    const quizGame = document.querySelector(".quiz");
    const quizGameChildren = quizGame.childNodes; // array of children of quiz game
    const buttonQuizGameChildren = [];
    quizGameChildren.forEach((ele) => {
      buttonQuizGameChildren.push(ele);
    });

    const buttons = []; // array for holding all buttons

    buttonQuizGameChildren.forEach((ele) => {
      buttons.push(ele.childNodes[1]);
    });
    buttons.pop();
    let numberCorrectAnswers = 0;
    let c = 0;
    correctAnswers = correctAnswers.slice(correctAnswers.length - 4);
    buttons.map((buttonDiv) => {
      // console.log("ButtonDiv = ", buttonDiv);
      const buttonDivChildren = buttonDiv.childNodes;
      for (let i = 0; i < buttonDivChildren.length; i++) {
        const button = buttonDivChildren[i];
        if (button.className === "quiz--button--selected") {
          if (button.textContent === correctAnswers[c]) {
            button.className = "quiz--button--selected--correct";
            numberCorrectAnswers++;
          } else {
            button.className = "quiz--button--selected--incorrect";
          }
        } else button.disabled = true;
      }
      c++;
      return -1;
    });
    const checkButton = document.querySelector(".check-btn");
    checkButton.disabled = true;
    if (document.querySelector(".displayScore")) {
      const displayScore = document.querySelector(".displayScore");
      displayScore.textContent = `Your score is ${numberCorrectAnswers}/4`;
    } else {
      const displayScoreSpan = document.createElement("span");
      displayScoreSpan.className = "displayScore";
      displayScoreSpan.textContent = `Your score is ${numberCorrectAnswers}/4`;
      const quizBody = document.querySelector(".quiz");
      quizBody.append(displayScoreSpan);
    }
  }

  if (errorState) {
    return (
      <div className="quiz" style={{ textAlign: "center", fontSize: "1.5em" }}>
        Error occured while fetching data from the server
        <ResetButton handleClick={handleClick} textContent="Reset" />
      </div>
    );
  } else
    return (
      <>
        {state && (
          <div className="quiz">
            {state.map((obj) => {
              let options = obj.incorrect_answers; // array of all the options for a question
              let correctAnswer = obj.correct_answer;
              correctAnswers.push(decodeHTMLText(correctAnswer));
              options.push(correctAnswer);
              let newOptions = options.map((option) => {
                return decodeHTMLText(option);
              });
              const question = decodeHTMLText(obj.question);
              const shuffledOptionsArray = shuffle(newOptions);
              return (
                <QuizBox2
                  question={question}
                  setBtnState={setBtnState}
                  btnState={btnState}
                  key={nanoid()}
                  componentId={obj.key}
                  state={state}
                  options={shuffledOptionsArray}
                />
              );
            })}
            <div className="CheckButtons">
              <ResetButton handleClick={handleClick} textContent="New Game" />
              <CheckButton CheckAnswer={CheckAnswer} />
            </div>
          </div>
        )}
      </>
    );
}
export default Quiz;
