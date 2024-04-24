// import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useEffect } from 'react';

// export const useQuizData = () => {
//   const [allQ, setAllQ] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3001/questions")
//       .then((res) => {
//         console.log(res);
//         setAllQ(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching quiz data:", error);
//       });
//   }, []);

//   return allQ;
// };


// export async function fetchQuizData() {
//   try {
//     // Make an HTTP GET request to fetch quiz data from the API endpoint
//     const response = await axios.get('http://localhost:3001/questions');

//     // Extract the data from the response
//     const questions = response.data;

//     // Convert fetched data into the desired format
//     const quizData = {
//       Questions: questions.map(question => ({
//         id: question.id,
//         question: question.question,
//         choices: question.choices,
//         correctAnswer: question.correctAnswer,
//         questionType: question.questionType
//       }))
//     };

//     return quizData;
//   } catch (error) {
//     console.error('Error fetching quiz data:', error);
//     throw error;
//   }
// }

// module.exports = fetchQuizData;


export async function fetchQuizData() {
  try {
    // Make an HTTP GET request to fetch quiz data from the API endpoint
    const response = await axios.get('http://localhost:3001/questions/');

    // Extract the data from the response
    const questions = response.data;

    // Convert fetched data into the desired format
    const quizData = {
      Questions: questions.map((question) => ({
        id: question.id,
        question: question.question,
        choices: question.choices,
        correctAnswer: question.correctAnswer,
        questionType: question.questionType,
        section:question.section
      }))
    };

    return quizData;



  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
}

export default fetchQuizData;
