// import axios from 'axios';
// import './App.css';
// import { useEffect, useState } from 'react';
// import { Quiz } from "./Molecules/QuizScreen/Quiz.tsx";
// import React from 'react';

// function App() {
//   const [questions, setQuestions] = useState<any[]>([]);

//   const BASE_URL = 'http://localhost:3001/questions';
  

//   // useEffect(()=>{
//   //   axios.get(`${BASE_URL}/questions`)
    
//   //   .then((res)=>setAllQ(res.data))

//   // },[]);

//   useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await axios.get(`${BASE_URL}/questions`);
//             setQuestions(response.data);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
      
//         fetchData();
//       }, []);


//   return ( 

   


// <>
// <div className="App">
//         <Quiz questions={questions} />
//       </div>
// </>
    
      
    
    
      
    
//   );
// }

// export default App;


import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
import { Quiz } from "./Molecules/QuizScreen/Quiz.tsx";
import React from 'react';

function App() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://localhost:3001/questions';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Quiz questions={questions} />
      )}
    </div>
  );
}

export default App;