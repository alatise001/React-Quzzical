import React from "react";
import Question from "./questions";
import Quzzical from "./quzzical";
import { nanoid } from "nanoid";
import myBlob from "./blobanimation.svg";

function App() {
  const [isPlayAgain, setIsPlayAgain] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const [isclicked, setIsClicked] = React.useState(false);
  const [isStart, setIsStart] = React.useState(false);
  const [isScore, setIsScore] = React.useState(0);
  const [isData, setData] = React.useState([]);
  const [isTimer, setIsTimer] = React.useState(10);
  const [isTime, setIsTime] = React.useState();
  const [isNoOfQuestion, SetIsNoOfQuestion] = React.useState({
    question: 10,
    category: "any",
    difficulty: "any",
  });

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  function handleClick(answer, id, target) {
    console.log(answer, id, target);
    setData((prevState) => {
      return prevState.map((mapped, index) => {
        if (id === index) {
          return {
            ...mapped,
            selected: mapped.selected === answer ? null : answer,
          };
        } else {
          return mapped;
        }
      });
    });
  }

  React.useEffect(() => {
    if (isclicked === true) {
      fetch(
        `https://opentdb.com/api.php?amount=${isNoOfQuestion.question}&category=${isNoOfQuestion.category}&difficulty=${isNoOfQuestion.difficulty}`
      )
        .then((result) => result.json())
        .then((data) => {
          if (data.response_code === 0) {
            setIsStart((prev) => !prev);
            setData(
              data.results.map((map) => {
                return {
                  questions: map.question,
                  answer: shuffleArray([
                    ...map.incorrect_answers,
                    map.correct_answer,
                  ]),
                  id: nanoid(),
                  correct_answer: map.correct_answer,
                  selected: null,
                };
              })
            );
          }
        })
        .catch((err) => console.log(err));
    }
  }, [isPlayAgain]);

  React.useEffect(() => {
    // let timer;
    // if (isStart) {
    const timer =
      isStart > 0 &&
      isTimer &&
      setInterval(() => setIsTimer(isTimer - 1), 1000);
    return () => clearInterval(timer);
    // }
  }, [isTimer, isStart]);

  const questions = isData.map((question, index) => {
    return (
      <Question
        key={nanoid()}
        isdata={question}
        checked={isChecked}
        handleClick={handleClick}
        id={index}
      />
    );
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    setIsChecked((prevState) => !prevState);

    console.log(isScore);

    isData.map((map) => {
      console.log(map.selected, map.correct_answer);
      if (map.selected === map.correct_answer) {
        setIsScore((prevState) => ++prevState);
      }
    });

    setIsTimer((prevState) => {
      return (prevState = 0);
    });
  }

  function toggle(e, dif, que, cat) {
    SetIsNoOfQuestion((prev) => {
      return {
        ...prev,
        question: que,
        category: cat,
        difficulty: dif,
      };
    });
    let time;
    //45secs for easy 35 for medium 25 for hard
    console.log(e.target, dif, que);
    const hard = 5;
    const mid = 10;
    const easy = 15;

    if (dif === "easy") {
      time = easy * que;
    } else if (dif === "medium") {
      time = mid * que;
    } else {
      time = hard * que;
    }
    setIsTime((prev) => (prev = time));

    setIsTimer((prevState) => {
      return (prevState = time);
    });

    setIsClicked((prevState) => !prevState);
    setIsPlayAgain((prevState) => !prevState);
  }

  function playAgain(params) {
    setIsPlayAgain((prevState) => !prevState);
    setIsChecked((prevState) => !prevState);
    setIsStart((prevState) => !prevState);
    setIsScore((prevState) => {
      return (prevState = 0);
    });
    setIsTimer((prevState) => {
      return (prevState = isTime);
    });
  }

  return (
    <main className="main">
      {isStart ? (
        <div className="play">
          <h3 className="time">Time: {isTimer}</h3>
          {questions}
          {isChecked ? (
            <h3 className="scoreText">
              You scored {isScore}/10 correct answers
            </h3>
          ) : (
            ""
          )}
          {isChecked ? (
            <button onClick={playAgain} className="submit">
              Play Again
            </button>
          ) : (
            <button onClick={handleSubmit} className="submit">
              Check Answer
            </button>
          )}
        </div>
      ) : (
        <div className="quiz-div">
          <Quzzical toggle={toggle} />
        </div>
      )}
      <img className="blob1" src={myBlob} alt="" />
      <img className="blob2" src={myBlob} alt="" />
    </main>
  );
}

export default App;
