import React from "react";
import { useState, useEffect } from "react";
// import { aaa } from "./sqAnswerCheck";


var LaTeX = require("react-latex")

type SQProps = {
  questionLength: number;
  question: string;
  correctAnswer: string;
  // userInput: string;
  currentQuestion: number;
  updateScores: (result: boolean) => void;
  image:string;
};

export const SQ: React.FC<SQProps> = ({
  questionLength,
  question,
  correctAnswer,
  currentQuestion,
  updateScores,
  image,
}) => {
  const [answerSQ, setAnswerSQ] = useState("");
  const [Input, setInput] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  function checkResult(answerSQ, correctAnswer) {
    var a;
    var b;

    if (answerSQ.includes("/")) {
      const splitUserInput = answerSQ.split("/");
      a = parseInt(splitUserInput[0], 10) / parseInt(splitUserInput[1], 10);
      a = Math.round(a * 10000) / 10000;
    } else {
      a = parseFloat(answerSQ);
    }

    if (correctAnswer.includes("/")) {
      const splitAnswer = correctAnswer.split("/");
      b = parseInt(splitAnswer[0], 10) / parseInt(splitAnswer[1], 10);
      b = Math.round(b * 10000) / 10000;
    } else {
      b = parseFloat(correctAnswer);
    }
    if (a === b || answerSQ === correctAnswer) {
      updateScores(true);
    } else {
      updateScores(false);
    }
    console.log(answerSQ, correctAnswer)
  }

  const onClickNextButton = () => {
    setAnswerSQ(Input);
    checkResult(Input, correctAnswer);
    setInput("");
  };

  return (
    <>
       <h2 className="question flex flex-row items-center justify-center">
      <div className="flex items-center justify-center m-10">
      {image && (
          <img src={image} alt="" className="max-w-xs object-cover border-2 p-4 border-cyan-600" />
        )}
      <div className="flex items-center justify-center m-10">
                  <LaTeX>{question}</LaTeX>
                </div>
          
        </div>



      </h2>
      <input
        type="text"
        onChange={handleInputChange}
        value={Input}
        className="input bg-slate-100 border-2 border-gray-400 rounded-lg"
        maxlength="6"
      />
      <div className="footer">
        <button onClick={() => onClickNextButton()} disabled={Input === ""}>
          {currentQuestion === questionLength - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </>
  );
};
