import React from "react";
import { nanoid } from "nanoid";

function Question(props) {
  const answers = props.isdata.answer;

  function answer(params) {
    const answer = answers.map((map) => {
      return {
        id: nanoid(),
        answer: map,
      };
    });
    console.log("called");

    return answer;
  }
  const [isAnswer, setIsAnswer] = React.useState(answer());

  function handleClick(id, answer, otherid, target) {
    props.handleClick(answer, otherid, target);
  }

  const myAnswer = isAnswer.map((map) => {
    const styles = (answer) => {
      if (props.isdata.selected === answer) {
        return { backgroundColor: "#D6DBF5" };
      } else {
        return { backgroundColor: "" };
      }
    };

    const back = (answer) => {
      console.log("clicked");
      if (props.isdata.correct_answer === answer) {
        return { backgroundColor: "#94D7A2" };
      } else if (props.isdata.selected === answer) {
        return { backgroundColor: "#F8BCBC" };
      } else {
        return { backgroundColor: "" };
      }
    };
    return (
      <button
        style={props.checked ? back(map.answer) : styles(map.answer)}
        className={`ans-btn`}
        value={map.answer}
        key={nanoid()}
        id={map.id}
        onClick={(e) => handleClick(map.id, map.answer, props.id, e.target)}
      >
        {map.answer}
      </button>
    );
  });

  return (
    <div key={nanoid()} className="question">
      <p className="question-title">{props.isdata.questions}</p>

      <div className="ans-div">{myAnswer}</div>
    </div>
  );
}

export default Question;
