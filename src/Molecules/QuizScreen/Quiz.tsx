import { useEffect, useState,useCallback } from "react";
import { FinalResult } from "../QuizComponents/FinalResult.tsx";
import { MCQ } from "../QuizComponents/MCQ.tsx";
import { SQ } from "../QuizComponents/SQ.tsx";
import React from "react";
import { ModuleTwo } from "../ModuleTwo/ModuleTwo.jsx";

var LaTeX = require("react-latex")


type QuizProps = {
  questions: any;
};


export const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [startModuleTwo, setStartModuleTwo] = useState(false);
  const [correctAns, setCorrectAns] = useState(0);
  const [wrongAns, setWrongAns] = useState(0);
  const [showFinalResult, setShowFinalResult] = useState(false);
  
  const [finishedM2, setFinishedM2] = useState(false);

const [currentQuestionM2, setCurrentQuestionM2] = useState(0);
//  const { question, id, correctAnswer, qType,image,qNo, module } =
//     questions[currentQuestion];
// const questionLength = questions.length;



   //// Filter questions for module 1
  //  const filteredQuestionsModule1 = questions.filter((q) => q.module === 1);

 
 

  // const { questionM1, idM1, correctAnswerM1, qTypeM1, imageM1, qNoM1, moduleM1 } =




  

   

  // Filter questions for module 2 (optional)
  //  const filteredQuestionsModule2 = questions.filter((q) => q.module === 2);



  // const { questionM2, idM2, correctAnswerM2, qTypeM2, imageM2, qNoM2, moduleM2 } =
  //   filteredQuestionsModule2[currentQuestion];

  const filteredQuestionsModule1 = React.useMemo(() => {
    return questions.filter((q) => q.module === 1);
  }, [questions]);
  
  const filteredQuestionsModule2 = React.useMemo(() => {
    return questions.filter((q) => q.module === 2);
  }, [questions]);

  
const { question, id, correctAnswer, qType,image,qNo, module } =
    filteredQuestionsModule1[currentQuestion];


    const { questionM2, idM2, correctAnswerM2, qTypeM2,imageM2,qNoM2, moduleM2 } =
    filteredQuestionsModule2[currentQuestionM2];

    


//////////////////////  Q Length //////////////////////
 const questionLength = filteredQuestionsModule1.length;
 const questionLengthM2 = filteredQuestionsModule2.length;

/////////////////////////////////////////////////////////////

  const onTryAgain = () => {
    setShowFinalResult(false);
    setStartModuleTwo(false);
    setCorrectAns(0);
    setWrongAns(0);
  };


////////////////////////////////////////////////Score////////////////////////////////////////////////
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
      setStartModuleTwo(true);
      // setShowFinalResult(true);


      

    } else {
      setCurrentQuestion(currentQuestion + 1);
    }

    if (startModuleTwo === true) {
    if (currentQuestionM2 === questionLengthM2 - 1) {
      setCurrentQuestionM2(0);
      // setStartModuleTwo(true);
      setShowFinalResult(true);
    } else {
      setCurrentQuestionM2(currentQuestionM2 + 1);
    }
  }
    
  }
////////////////////////////////////////////////Score////////////////////////////////////////////////






// function UpdateScores(newScoreUpdate) {
//   const [tempCorrectAns, setTempCorrectAns] = useState(correctAns);
//   const [tempWrongAns, setTempWrongAns] = useState(wrongAns);

//   if (newScoreUpdate) {
//     setTempCorrectAns(tempCorrectAns + 1);
//     console.log("Score++");
//   } else {
//     setTempWrongAns(tempWrongAns + 1);
//     console.log("Score--");
//   }

//   if (currentQuestion === questionLength - 1) {
//     setCurrentQuestion(0);
//       setStartModuleTwo(true);
//       setShowFinalResult(true);
//   } else {
//     setCurrentQuestion(currentQuestion + 1);
//   }

//   setCorrectAns(tempCorrectAns);
//   setWrongAns(tempWrongAns);
// }

//   const [tempCorrectAns, setTempCorrectAns] = useState(correctAns);
//   const [tempWrongAns, setTempWrongAns] = useState(wrongAns);

// function UpdateScores(newScoreUpdate) {

//   if (newScoreUpdate) {
//     setTempCorrectAns(tempCorrectAns + 1);
//     console.log("Score++");
//   } else {
//     setTempWrongAns(tempWrongAns + 1);
//     console.log("Score--");
//   }

//   if (currentQuestion === questionLength - 1) {
//     setCurrentQuestion(0);
//       setStartModuleTwo(true);
//       // setShowFinalResult(true);
//   } else {
//     setCurrentQuestion(currentQuestion + 1);
//   }

//   setCorrectAns(tempCorrectAns);
//   setWrongAns(tempWrongAns);
// }

 
  // if (finishedM2==true) {
  //   setShowFinalResult(true);
  // }
  

  const checkFinishedM2 = useCallback((data) => {
    setShowFinalResult(data)
    setStartModuleTwo(false)
    // setFinishedM2(data);
  }, []);




  // Early return for FinalResult
  // if (showFinalResult) {
  //   return (
  //     <FinalResult
  //       questionLength={questionLength}
  //       correctAns={correctAns}
  //       wrongAns={wrongAns}
  //       onTryAgain={onTryAgain}
  //     />
  //   );
  // }
  // if (startModuleTwo) {
  //   return (
  //     <ModuleTwo 
  //     moduleTwoQuestions={filteredQuestionsModule2}
  //     finishedModuleTwo={checkFinishedM2}
  //     />
  //   );
  // }
  return (
    



    <div className="quiz_container">

      {startModuleTwo && 
      
      
      
      <>
  {qTypeM2 === "SQ" ? (
              <SQ
                questionLength={questionLengthM2}
                question={questionM2}
                correctAnswer={correctAnswerM2}
                currentQuestion={currentQuestionM2}
                updateScores={updateScores}
                image={imageM2}
                qNo={qNoM2}
              />
              
            ) : (
              <MCQ
                questionLength={questionLengthM2}
                question={questionM2}
                correctAnswer={correctAnswerM2}
                QuestionId={idM2}
                currentQuestion={currentQuestionM2}
                updateScores={updateScores}
                image={imageM2}
                qNo={qNoM2}
              />
            )}
          </>}

      

      {showFinalResult && <FinalResult
          questionLength={questionLength}
          correctAns={correctAns}
          wrongAns={wrongAns}
          onTryAgain={onTryAgain}

        />}


 {!showFinalResult
 &&
  !startModuleTwo
   ? (
  <>
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
        ): (<div> </div>)}  
        
        
      



        
        {/* {!showFinalResult ? (
        
        <> 

         <span className="progress">
           {currentQuestion + 1}/{questions.length}
         </span>

         
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
       startModuleTwo ? (
       <ModuleTwo 
       moduleTwoQuestions={filteredQuestionsModule2}
       finishedModuleTwo={checkFinishedM2}
       />
       ):(
     <FinalResult
       questionLength={questionLength}
       correctAns={correctAns}
       wrongAns={wrongAns}
       onTryAgain={onTryAgain}
     />
       )
   )} */}
    
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

