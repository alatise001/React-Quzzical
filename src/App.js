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
      fetch(`https://opentdb.com/api.php?amount=10`)
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

    console.log("ran");
  }, [isPlayAgain]);
  console.log(isData);

  React.useEffect(() => {
    // let timer;
    // if (isStart) {
    const timer =
      isTimer > 0 &&
      isStart &&
      setInterval(() => setIsTimer(isTimer - 1), 1000);
    return () => clearInterval(timer);
    // }
  }, [isTimer, isStart]);

  // const timer = () => {
  //   if (isTimer > 0) {
  //   } else {
  //     console.log("Done");
  //     setIsTimer((prevState) => prevState - 1);
  //   }
  // };

  // if (isTimer > 0) {
  //   setInterval(timer, 1000);
  // } else {
  //   console.log("Done");
  // }
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
  }
  console.log(isScore);

  function toggle(params) {
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
      return (prevState = 10);
    });
  }

  return (
    <main className="main">
      {/* <h3>{isTimer}</h3> */}
      {isStart ? (
        <div className="play">
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
