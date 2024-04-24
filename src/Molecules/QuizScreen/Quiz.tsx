import { useEffect, useState } from "react";
import { FinalResult } from "../QuizComponents/FinalResult.tsx";
import { MCQ } from "../QuizComponents/MCQ.tsx";
import { SQ } from "../QuizComponents/SQ.tsx";
import React from "react";




type QuizProps = {
  questions: any;
};


export const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const questionLength = questions.length;

  const { question, id, correctAnswer, qType } =
    questions[currentQuestion];


  
// export const Quiz = ()=>{

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [correctAns, setCorrectAns] = useState(0);
//   const [wrongAns, setWrongAns] = useState(0);
//   const [showFinalResult, setShowFinalResult] = useState(false);


//   const [allQ, setQuestions] = useState<any>([]);

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

//   const { question, choices, correctAnswer, qType } =
//   allQ[currentQuestion];

//   const questionLength = allQ.length;



  const onTryAgain = () => {
    setShowFinalResult(false);
    setCorrectAns(0);
    setWrongAns(0);
  };
  function updateScores(newScoreUpdate) {
    newScoreUpdate ? setCorrectAns(correctAns + 1) : setWrongAns(wrongAns + 1);

    if (currentQuestion === questionLength - 1) {
      setCurrentQuestion(0);
      setShowFinalResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  return (
    <div className="quiz_container">
      <span className="progress">
        {currentQuestion + 1}/{questions.length}
      </span>
      {!showFinalResult ? (
        qType === "SQ" ? (
          <SQ
            questionLength={questionLength}
            question={question}
            correctAnswer={correctAnswer}
            
            currentQuestion={currentQuestion}
            updateScores={updateScores}
          />
        ) : (
          qType === "MCQ" && (
            <MCQ
              questionLength={questionLength}
              question={question}
              correctAnswer={correctAnswer}
              QuestionId={id}
              currentQuestion={currentQuestion}
              updateScores={updateScores}
            />
          )
        )
      ) : (
        <FinalResult
          questionLength={questions.length}
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

