import React from "react";

function Quzzical(props) {
  const [formData, setFormData] = React.useState({
    difficulty: "",
    noOfQuestions: "",
    category: "",
  });

  function handlechg(e) {
    // console.log(e.target);
    const { name, value, checked, type } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  return (
    <div className="quiz">
      <h1 className="header">Quizzical</h1>

      <div className="options">
        <label for="noOfQuestions">Number of Questions</label>
        <input
          className="style"
          type="number"
          min="1"
          max="50"
          name="noOfQuestions"
          placeholder="No Of Question"
          onChange={handlechg}
          value={formData.noOfQuestions}
        />

        <label for="category">Select Category</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handlechg}
        >
          <option value="any">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">
            Entertainment: Cartoon &amp; Animations
          </option>{" "}
        </select>
        {/* <select
          id="noOfQuestions"
          value={formData.noOfQuestions}
          onChange={handlechg}
        >
          <option value="">No Of Questions</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="10">10</option>
        </select> */}
        <label for="difficulty"> Select Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handlechg}
        >
          <option value="any">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        onClick={(e) => {
          props.toggle(
            e,
            formData.difficulty,
            formData.noOfQuestions,
            formData.category
          );
        }}
        className="start-btn"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Quzzical;

//45secs for easy 35 for medium 25 for hard
