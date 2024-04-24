// import axios from 'axios';
// import './App.css';
// import { useEffect, useState } from 'react';
// import { Quiz } from "./Molecules/QuizScreen/Quiz.tsx";

// function App() {
//   const [allQ, setAllQ] = useState([]);
//   const [allQuestions, setAllQuestions] = useState([]);
//   const BASE_URL = 'http://localhost:3001/questions';
  
  

// // useEffect(()=>{
// // fetch(`${BASE_URL}/questions`)
// // .then((res)=>setAllQ(res.json()))
// // .then((data)=>setAllQ(data.data))
// // },[])




//   useEffect(()=>{
//     axios.get(`${BASE_URL}/questions`)
    
//     .then((res)=>setAllQ(res.data))


//   },[]);




//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get(`${BASE_URL}/questions`);
//   //       setAllQ(response.data);
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error);
//   //     }
//   //   };
  
//   //   fetchData();
//   // }, []);



//   // useEffect(()=>{

//   //   const quizData = {
//   //     Questions: allQ.map((question) => ({
//   //       id: question.id,
//   //       question: question.question,
//   //       choices: question.choices,
//   //       correctAnswer: question.correctAnswer,
//   //       questionType: question.questionType,
//   //       section:question.section
//   //     }))
      
      
//   //   };
//   //   setAllQuestions(quizData) 
//   // },[allQ])




//   // console.log(allQ)
//   // console.log(typeof allQ);
//   // console.log(Array.isArray(allQ));





//   return ( 

//     // <div className="App">
//     //   {allQ.map((value, key) => {
//     //     return (
//     //     <>
//     //     <div className='question'>{value.question}</div>
//     //     <div className='choices'>{value.choices[1]}</div>
//     //     </>
        
//     //     )
//     //   })}
//     //  </div>






    
    
//     // <div className="App">
//     //     <Quiz />
//     //   </div>







//     <div className="App">
//         <Quiz questions={allQ} />
//       </div>
      
    
    
      
    
//   );
// }

// export default App;





// import axios from 'axios';
// import './App.css';
// import { useEffect, useState } from 'react';
// import { Quiz } from "./Molecules/QuizScreen/Quiz.tsx";
// import React from 'react';

// function App() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = 'http://localhost:3001/questions';

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/questions`);
//         setQuestions(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <Quiz questions={questions} />
//       )}
//     </div>
//   );
// }


import './styles.css';
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import QuestionPage from "./pages/QuestionPage";
import LandingPage from './pages/LandingPage';
import addQuestions from './pages/addingQuestions';
import QuestionSetPage from './pages/QuestionSetPage';

function App(){
  return(
    <div className="">
      
      
      <Router className="">
        <div className='font-bold text-balance flex justify-around bg-blue-300'>
          <Link to="/">  Home  </Link>
          <Link to="/addingQuestions">  addQuestions  </Link>
          <Link to="/questions">  questions  </Link>
          <Link to="/questionSet">  Question Set  </Link>

        </div>
      


        <Routes className="">
          <Route path="/" exact Component={LandingPage}/>
          <Route path="/addingQuestions" exact Component={addQuestions}/>
          <Route path="/questions" exact Component={QuestionPage}/>
          <Route path="/questionSet" exact Component={QuestionSetPage}/>

          
        </Routes>

      </Router>
    </div>
  )
}




export default App;
