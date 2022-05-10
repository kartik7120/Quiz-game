import React, { Suspense } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const QuizComponent = React.lazy(() => {
  return import("./Quiz");
});

function Welcome(props) {
  const [render, setRender] = React.useState(true);

  function handleClick(e) {
    setRender(false);
  }
  return render ? (
    <div className="home">
      <h1 className="home--heading">Quizzical</h1>
      <h5 className="home--heading2">
        This is a simple Trivia game made in React
      </h5>
      <button
        type="button"
        className="welcome--quiz--button"
        onClick={handleClick}
      >
        Start Quiz
      </button>
    </div>
  ) : (
    <Suspense fallback={<ClimbingBoxLoader />}>
      <QuizComponent />
    </Suspense>
  );
}
export default Welcome;
