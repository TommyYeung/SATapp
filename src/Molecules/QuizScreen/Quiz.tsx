import { useEffect, useState } from "react";
import { FinalResult } from "../QuizComponents/FinalResult.tsx";
import { MCQ } from "../QuizComponents/MCQ.tsx";
import { SQ } from "../QuizComponents/SQ.tsx";
import React from "react";

var LaTeX = require("react-latex")


type QuizProps = {
  questions: any;
};


export const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  const [showFinalResult, setShowFinalResult] = useState(false);
  

//  const { question, id, correctAnswer, qType,image,qNo, module } =
//     questions[currentQuestion];
// const questionLength = questions.length;



   //// Filter questions for module 1
   const filteredQuestionsModule1 = questions.filter((q) => q.module === 1);

   //// Filter questions for module 2 (optional)
  //  const filteredQuestionsModule2 = questions.filter((q) => q.module === 2);
 

  // const { questionM1, idM1, correctAnswerM1, qTypeM1, imageM1, qNoM1, moduleM1 } =




  const { question, id, correctAnswer, qType,image,qNo, module } =
    filteredQuestionsModule1[currentQuestion];

    const questionLength = filteredQuestionsModule1.length;




  // const { questionM2, idM2, correctAnswerM2, qTypeM2, imageM2, qNoM2, moduleM2 } =
  //   filteredQuestionsModule2[currentQuestion];




  const onTryAgain = () => {
    setShowFinalResult(false);
    setCorrectAns(0);
    setWrongAns(0);
  };
  function updateScores(newScoreUpdate) {
    // newScoreUpdate ? setCorrectAns(correctAns + 1) : setWrongAns(wrongAns + 1);
    if (newScoreUpdate) {
      setCorrectAns(correctAns + 1)
      console.log("Score++")
    } else{
      setWrongAns(wrongAns + 1)
      console.log("Score--")
    } 

    if (currentQuestion === questionLength - 1) {
      setCurrentQuestion(0);
      setShowFinalResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }
 
  const fraction =`${question}`
  return (
    <div className="quiz_container">
      {!showFinalResult ? (
        
          <>

            {/* <span className="progress">
              {currentQuestion + 1}/{questions.length}
            </span> */}

            
            {qType === "SQ" ? (
              <SQ
                questionLength={questionLength}
                question={question}
                correctAnswer={correctAnswer}
                currentQuestion={currentQuestion}
                updateScores={updateScores}
                image={image}
                qNo={qNo}
              />
            ) : (
              <MCQ
                questionLength={questionLength}
                question={question}
                correctAnswer={correctAnswer}
                QuestionId={id}
                currentQuestion={currentQuestion}
                updateScores={updateScores}
                image={image}
                qNo={qNo}
              />
            )}
          </>
        )  : (
        <FinalResult
          questionLength={questionLength}
          correctAns={correctAns}
          wrongAns={wrongAns}
          onTryAgain={onTryAgain}
        />
      )}
    </div>
  );
};








// export const Quiz = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [correctAns, setCorrectAns] = useState(0);
//   const [wrongAns, setWrongAns] = useState(0);
//   const [showFinalResult, setShowFinalResult] = useState(false);
//   const [allQ, setQuestions] = useState<any[]>([]);

//   const BASE_URL = 'http://localhost:3001/questions';

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/questions`);
//         setQuestions(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchData();
//   }, []);

//   const question = allQ[currentQuestion]?.question;
//   const choices = allQ[currentQuestion]?.choices;
//   const correctAnswer = allQ[currentQuestion]?.correctAnswer;
//   const questionType = allQ[currentQuestion]?.questionType;
//   const questionLength = allQ.length;

//   const onTryAgain = () => {
//     setShowFinalResult(false);
//     setCorrectAns(0);
//     setWrongAns(0);
//   };

//   function updateScores(newScoreUpdate) {
//     newScoreUpdate ? setCorrectAns(correctAns + 1) : setWrongAns(wrongAns + 1);

//     if (currentQuestion === questionLength - 1) {
//       setCurrentQuestion(0);
//       setShowFinalResult(true);
//     } else {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   }

//   return (
//     <div className="quiz_container">
//       <span className="progress">
//         {currentQuestion + 1}/{questionLength}
//       </span>
//       {!showFinalResult ? (
//         questionType === "SQ" ? (
//           <SQ
//             questionLength={questionLength}
//             question={question}
//             correctAnswer={correctAnswer}
//             choices={choices}
//             currentQuestion={currentQuestion}
//             updateScores={updateScores}
//           />
//         ) : (
//           questionType === "MCQ" && (
//             <MCQ
//               questionLength={questionLength}
//               question={question}
//               correctAnswer={correctAnswer}
//               choices={choices}
//               currentQuestion={currentQuestion}
//               updateScores={updateScores}
//             />
//           )
//         )
//       ) : (
//         <FinalResult
//           questionLength={questionLength}
//           correctAns={correctAns}
//           wrongAns={wrongAns}
//           onTryAgain={onTryAgain}
//         />
//       )}
//     </div>
//   );
// };

