import React from "react";
import { useState } from "react";
import { boolean } from "yup";

type MCQProps = {
  questionLength: number;
  question: string;
  correctAnswer: string;
  choices: string[];
  currentQuestion: number;
  updateScores: (result:boolean) => void;
};

export const MCQ: React.FC<MCQProps> = ({
  questionLength,
  question,
  correctAnswer,
  choices,
  currentQuestion,
  updateScores,
}) => {
  const [answerMCQ, setAnswerMCQ] = useState(null);
  const [result, setResult] = useState<boolean>(false);

  const onClickMCQAnswer = (choice) => {
    setAnswerMCQ(choice);
    choice === correctAnswer ? setResult(true) : setResult(false);
  };

  const onClickNextButton = () => {
    updateScores(result);
    setAnswerMCQ(null);
  };

  return (
    <>
      <h2 className="question">{question}</h2>
      <ul className="choicelist">
        {choices.map((choice) => (
          <li
            key={choice}
            onClick={() => {
              return onClickMCQAnswer(choice);
            }}
            className={choice === answerMCQ ? "selected" : null}
          >
            {choice}
          </li>
        ))}
      </ul>
      <div className="footer">
        <button
          onClick={() => onClickNextButton()}
          disabled={answerMCQ === null}
        >
          {currentQuestion === questionLength - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </>
  );
};
