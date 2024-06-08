/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from "react";
import { AddQuestions } from "../Molecules/AddQuestionsScreen/AddQuestions.tsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { BASE_URL } from "../url.js";
import { QuestionSetUpdate } from "../Molecules/UpdateQuestionSet/QuestionSetUpdate.jsx"

import { useNavigate } from 'react-router-dom';




function reviewQuestions() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [teacherId, setTeacherId] = useState(0)
  const [thisTeacherQSet, setThisTeacherQSet] = useState([])

  const initialValues = {
    TeacherId: ''
  };


  const confirmTeacherId = useCallback(async (data) => {
    setTeacherId(data.TeacherId)
    console.log(data.TeacherId)
  });

  const loadQSetList=useEffect(()=>{

  
    axios.get(`${BASE_URL}/teacher/teacherAllQuestionSet/${teacherId}`)
      // axios.get("http://localhost:3001/teacher/teacherAllQuestionSet/1")
      .then((res) => {
        console.log("all QSet:", res.data)
        setThisTeacherQSet(res.data)
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error('Resource not found:', error.message);
        } else {
          console.error('Error fetching data:', error.message);
        }
      });


  }, [teacherId]);

 

  const handleCreateNewQSet = useCallback(async (data) => {

      axios.post(`${BASE_URL}/questionSet/addQuestionSet`,{"TeacherId":teacherId})
      
      .then((res) => {
        console.log(res)
        axios.get(`${BASE_URL}/teacher/teacherAllQuestionSet/${teacherId}`)
        .then((res)=>{
          setThisTeacherQSet(res.data)//make it update the ui to show the list
        })
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
         
          console.error('Resource not found:', error.message);
        } else {
          
          console.error('Error fetching data:', error.message);
        }
      });

    }, [teacherId]);
  
    const delQuestionSet = (qSetId)=>{
      axios.delete(`${BASE_URL}/questionSet/deleteQuestionSet/${qSetId}`)
      
      .then((res) => {
        console.log("Del QSet:", qSetId )
        console.log(":", res )
        // window.location.reload();
        

        const updatedQSetList = thisTeacherQSet.filter((qSet) => qSet.id !== qSetId);
        setThisTeacherQSet(updatedQSetList);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.error('Resource not found:', error.message);
        } else {
          console.error('Error fetching data:', error.message);
        }
      });
    }
  return (
    <>

      <div>

        <Formik
          initialValues={initialValues}
          onSubmit={confirmTeacherId}
        // validationSchema={validationSchema}

        >
   <Form className='bg-slate-300'>
            <br /><label>Teacher ID: </label>
            <Field type="number" id="TeacherId" name="TeacherId" placeholder="TeacherId" autoComplete="off" />


            <button type="submit" className="bg-indigo-200 rounded-xl p-1">Enter</button>

            
            <button onClick={handleCreateNewQSet} className="bg-indigo-200 rounded-xl p-1 ml-2 my-2">Add</button>
          </Form>

        </Formik>

      </div>

      <div>

        {
        thisTeacherQSet.map((value) => {
          return (
            <>
              <div>
                <QuestionSetUpdate
                questionSetNo={value.questionSetNo}
                title={value.title}
                description={value.description}
                id={value.id}
              />
               <button 
                className="border-2 border-red-500 bg-pink-200  m-2 px-1 rounded-xl"
                onClick={() => {
                  delQuestionSet(value.id)
                  
                }
              }
                >
                  DELETE
                </button>
              </div>
              

            </>

          )
        })
        
        }


      </div>
    </>

  )
}

export default reviewQuestions
