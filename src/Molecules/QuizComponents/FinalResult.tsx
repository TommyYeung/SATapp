import React from "react";

type FinalResultProps = {
    questionLength: number;
    correctAns: number;
    wrongAns: number;
    onTryAgain: () => void;
  };
  export const FinalResult: React.FC<FinalResultProps> = ({
    questionLength,
    correctAns,
    wrongAns,
    onTryAgain,
  }) => {
    return (
      <div className="final_result">
        <h2>Final Result</h2>
        <div>Total Number of Questions: {questionLength}</div>
        <div>Correct Answers: {correctAns}</div>
        <div>Wrong Answers: {wrongAns}</div>
        <button onClick={onTryAgain}>Try again</button>
      </div>
    );
  };
  