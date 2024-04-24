import React, { useEffect } from "react";
import { useState } from "react";
import { boolean } from "yup";
import { BASE_URL } from "../../url";
import axios from "axios";

type MCQProps = {
  questionLength: number;
  question: string;
  correctAnswer: string;
  // choices: string[];
  QuestionId: number;
  currentQuestion: number;
  updateScores: (result: boolean) => void;
};

export const MCQ: React.FC<MCQProps> = ({
  questionLength,
  question,
  correctAnswer,
  // choices,
  QuestionId,
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


  const [choices, setChoices] = useState([]);
  const [allChoices, setAllChoices] = useState();
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/choice/thisQuestionChoice/${QuestionId}`);
        // const response = await axios.get(`${BASE_URL}/choice/thisQuestionChoice/1`);
        setChoices(response.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);


      }
    };

    fetchData();
  }, [QuestionId]);
  console.log(choices)
  console.log(QuestionId)


  // const choicesData = {
  //   ChoiceDATA: choices.map((choice) => ({
  //     id: choice.id,
  //     choice: choice.choice,


  //   }))
  // }


  useEffect(() => {

    if (choices) {
      const c = choices.map((choice) => ({
        id: choice.id,
        choice: choice.choice,
        image: choice.image,
      }));

      setAllChoices(c)
    }


  }, [choices]);







  return (
    <>
      <h2 className="question">{question}</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (<>
        {/* {choicesData.ChoiceDATA.map((value) => {
          return (
            <div>{value.choice}</div>
          )
        })} */}




        {/* {allChoices.map((value) => {
          return (
            <div>choice:{value.choice}</div>
          )
        })} */}




        
        <ul className="choicelist">
        {allChoices.map((choice) => (
          <li
            key={choice}
            onClick={() => {
              return onClickMCQAnswer(choice);
            }}
            className={choice === answerMCQ ? "selected" : null}
          >
            {choice.choice}
            {choice.image}
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
      )}
    </>
  );
};
