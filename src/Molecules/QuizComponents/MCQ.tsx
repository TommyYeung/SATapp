import React, { useEffect } from "react";
import { useState } from "react";
import { boolean } from "yup";
import { BASE_URL } from "../../url";
import axios from "axios";


var LaTeX = require("react-latex")

type MCQProps = {
  questionLength: number;
  question: string;
  correctAnswer: string;
  // choices: string[];
  QuestionId: number;
  currentQuestion: number;
  updateScores: (result: boolean) => void;
  image: string;
  qNo: number;

};

export const MCQ: React.FC<MCQProps> = ({
  questionLength,
  question,
  correctAnswer,
  // choices,
  QuestionId,
  currentQuestion,
  updateScores,
  image,
  qNo
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
  // console.log(choices)
  // console.log(QuestionId)


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




  console.log("LATEX:", { question })


  return (
    <>
    <br /><div>Question: {qNo}</div><br />
      <h2 className="question flex flex-row">
        <div className="flex items-center justify-center m-10">
        {image && (
          <img src={image} alt="" className="max-w-xs object-cover border-2 p-4 border-cyan-600" />
        )}
          <div className="flex items-center justify-center m-10">
            
            <LaTeX>{question}</LaTeX>
          </div>

        </div>



      </h2>
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
                return onClickMCQAnswer(choice.choice);
              }}
              className={choice.choice === answerMCQ ? "selected" : null}
            >
              {/* <LaTeX >
                   {choice.choice} 
                </LaTeX>
                <div >

                  
                  <img src={choice.image} className="max-w-md object-cover"/>
                  </div>
                 */}
              <div className="flex flex-row">
              {choice.image && (
                <img src={choice.image} alt="" className="max-w-xs object-cover border-2 p-4 border-cyan-600" />
              )}
               <div className="flex items-center justify-center m-10">
                  <LaTeX>{choice.choice}</LaTeX>
                </div>
              </div>

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
