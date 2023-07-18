import React from "react";

function Quzzical(props) {
  return (
    <div className="quiz">
      <h1 className="header">Quizzical</h1>
      <button onClick={props.toggle} className="start-btn">
        Start Quiz
      </button>
    </div>
  );
}

export default Quzzical;
