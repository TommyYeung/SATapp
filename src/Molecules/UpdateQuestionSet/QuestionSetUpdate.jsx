import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { BASE_URL } from "../../url";
import { useNavigate } from 'react-router-dom';


export const QuestionSetUpdate = ({
    questionSetNo,
    title,
    description,
    id}
) => {

    const navigate = useNavigate();
    const onClickToGoToUpdateQuestionSetPage = (questionSetId) => {
        // Frontend url!!
        navigate(`/updateQuestions/${questionSetId}`);
    }
    const delQuestionSet = (qSetId)=>{
      axios.delete(`${BASE_URL}/questionSet/deleteQuestionSet/${qSetId}`)
      // http://localhost:3001/questionSet/deleteQuestionSet/6
      .then((res) => {
        console.log("Del QSet:", qSetId )
        
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error('Resource not found:', error.message);
        } else {
          console.error('Error fetching data:', error.message);
        }
      });
    }


return(
    <>
    
    <div className='border-2 border-blue-500 bg-sky-200 m-2 p-2 rounded-xl '>
                <div className='text-xl font-semibold'>{questionSetNo}</div>
                <div className='text-lg font-normal'>Title: {title}</div>
                <div className='text-sm font-light'>Description: {description}</div>
                <button className='border-2 border-green-600 bg-emerald-200  m-2 px-1 rounded-xl'
                  onClick={() => {
                    onClickToGoToUpdateQuestionSetPage(id)
                  }
                  }

                >Update Question Set</button>

                <button 
                className="border-2 border-red-500 bg-pink-200  m-2 px-1 rounded-xl"
                onClick={() => {
                  delQuestionSet(id)
                }
              }
                >
                  DELETE
                </button>
              </div>

    </>
);
    
};
