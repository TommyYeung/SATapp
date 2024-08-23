// import { React, useEffect, useState,useCallback } from 'react'
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from 'yup';
// import axios from "axios";
// import { BASE_URL } from "../../url";
// import { useParams, useNavigate } from 'react-router-dom';

// import {QuestionSetUpdateScreen}from '../UpdateQuestions/QuestionUpdateScreen'

// export const QuestionUpdate = ({

// }) => {
//     const { id } = useParams();

//     const [allQ, setAllQ] = useState([]);
 
//     const [isEditing,setIsEditing]=useState(false)



// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/questionSet/questionSetAllQuestion/${id}`);
//         setAllQ(response.data);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           console.error('Resource not found:', error.message);
//         } else {
//           console.error('Error fetching data:', error.message);
//         }
//       }
//     };

//     fetchData();
//   }, [id]);


//   const delQuestion = (qId)=>{
//     axios.delete(`${BASE_URL}/question/deleteQuestion/${qId}`)
    
//     .then((res) => {
//       console.log("Del Q:", qId )
//       console.log(":", res )
//       // window.location.reload();
      

//       const updatedQSetList = allQ.filter((questions) => questions.id !== qId);
//       setAllQ(updatedQSetList);
//     })
//     .catch((error) => {
//       if (error.response && error.response.status === 404) {
//         console.error('Resource not found:', error.message);
//       } else {
//         console.error('Error fetching data:', error.message);
//       }
//     });
//   }




// const handleCreateQuestion = useCallback(async (data) => {

//   axios.post(`${BASE_URL}/question/addQuestion`,{"QuestionSetId":id})
  
//   .then((res) => {
//     console.log(res)
//     axios.get(`${BASE_URL}/questionSet/questionSet/${id}`)

//     .then((Q) => {
//         console.log("reloadAllQ:", Q.data)
//         setAllQ(Q.data)
//     })
//   })
//   .catch((error) => {
//     if (error.response && error.response.status === 404) {
     
//       console.error('Resource not found:', error.message);
//     } else {
      
//       console.error('Error fetching data:', error.message);
//     }
//   });

// }, [id]);








//   return (
//     <div>
// <div>
// <button
//                     className=" m-2 p-1 font-semibold bg-teal-300 rounded-lg border-2 border-purple-600 "
//                     onClick={handleCreateQuestion}
//                     >
//                         Add New Question
//                     </button>
// </div>
// <div>

//   <div>
//         {allQ.map((allQ) => (
      
//     <>
//     <QuestionSetUpdateScreen   
//       correctAnswer={allQ.correctAnswer}
//     image={allQ.image}
//     module={allQ.module}
//     qType={allQ.qType}
//     question={allQ.question}
//     id={allQ.id}
    
//     />
// <button 
//                 className="border-2 border-red-500 bg-pink-200  m-2 px-1 rounded-xl"
//                 onClick={() => {
//                   delQuestion(allQ.id)
                  
//                 }
//               }
//                 >
//                   DELETE
//                 </button>

//     </>
    
//     ))}
//     </div>



// </div>
//     </div>
//   )
// }


import { React, useEffect, useState, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { BASE_URL } from "../../url";
import { useParams, useNavigate } from 'react-router-dom';

import { QuestionSetUpdateScreen } from '../UpdateQuestions/QuestionUpdateScreen';

export const QuestionUpdate = ({ }) => {
  const { id } = useParams();

  const [allQ, setAllQ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/questionSet/questionSetAllQuestion/${id}`);
        setAllQ(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Resource not found:', error.message);
        } else {
          console.error('Error fetching data:', error.message);
        }
      }
    };

    fetchData();
  }, [id]);
  // }, [id,allQ]);

  const delQuestion = (qId) => {
    axios.delete(`${BASE_URL}/question/deleteQuestion/${qId}`)
      .then((res) => {
        console.log("Del Q:", qId);
        console.log(":", res);

        const updatedQSetList = allQ.filter((questions) => questions.id !== qId);
        setAllQ(updatedQSetList);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error('Resource not found:', error.message);
        } else {
          console.error('Error fetching data:', error.message);
        }
      });
  };

  const handleCreateQuestion = useCallback(async (data) => {
    axios.post(`${BASE_URL}/question/addQuestion`, { QuestionSetId: id })
      .then((res) => {
        console.log(res);

        // Refetch all questions after creating a new one
        axios.get(`${BASE_URL}/questionSet/questionSet/${id}`)
          .then((Q) => {
            console.log("reloadAllQ:", Q.data);
            setAllQ(Q.data);
          });

        // const updatedQSetList = allQ.filter((questions) => questions.id !== id);
        // setAllQ(updatedQSetList);


      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error('Resource not found:', error.message);
        } else {
          console.error('Error fetching data:', error.message);
        }
      });
  }, [id]);

  return (
    <div>
      <div>
        <button
          className="m-2 p-1 font-semibold bg-teal-300 rounded-lg border-2 border-purple-600"
          onClick={handleCreateQuestion}
        >
          Add New Question
        </button>
      </div>
      <div>
        {allQ.length > 0 && (
          <div>
            {allQ.map((allQ) => (
              <>
                <QuestionSetUpdateScreen
                  correctAnswer={allQ.correctAnswer}
                  image={allQ.image}
                  module={allQ.module}
                  qType={allQ.qType}
                  question={allQ.question}
                  id={allQ.id}
                  qNo={allQ.qNo}
                />
                <button
                  className="border-2 border-red-500 bg-pink-200 m-2 px-1 rounded-xl"
                  onClick={() => delQuestion(allQ.id)}
                >
                  DELETE
                </button>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
