import React from "react";
import { nanoid } from "nanoid";

// import Anwer from "./answer";

function Question(props) {
  const answers = props.isdata.answer;
  const correct_answer = props.isdata.correct_answer;

  function answer(params) {
    const answer = answers.map((map) => {
      return {
        // correct_answer: props.isdata.correct_answer,
        id: nanoid(),
        answer: map,
        isTrue: false,
        disabled: false,
      };
    });
    console.log("called");

    return answer;
  }
  const [isAnswer, setIsAnswer] = React.useState(answer());

  // console.log(isAnswer);

  function handleClick(id, answer, otherid, target) {
    setIsAnswer((prevState) => {
      return prevState.map((prev) => {
        return prev.id === id
          ? { ...prev, isTrue: !prev.isTrue, disabled: false }
          : { ...prev, disabled: !prev.disabled };
      });
    });

    console.log(answer);

    props.handleClick(answer, otherid, target);
  }
  // console.log(isAnswer);

  const myAnswer = isAnswer.map((map) => {
    // const styles = () => {
    //   // console.log(map.isTrue);
    //   if (map.isTrue) {
    //     return { backgroundColor: "#D6DBF5" };
    //   } else {
    //     return { backgroundColor: "" };
    //   }
    // };
    const styles = (answer) => {
      if (props.isdata.selected === answer) {
        return { backgroundColor: "#D6DBF5" };
      } else {
        return { backgroundColor: "" };
      }
    };

    // const styles = {
    //   backgroundColor: map.isBool ? "#D6DBF5" : "",
    // };

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
        disabled={map.disabled}
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
