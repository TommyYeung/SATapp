/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from "react";
import { AddQuestions } from "../Molecules/AddQuestionsScreen/AddQuestions.tsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { BASE_URL } from "../url.js";
import { QuestionSetUpdate } from "../Molecules/UpdateQuestions/QuestionSetUpdate.jsx"





function reviewQuestions() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [teacherId, setTeacherId] = useState(0)
  const [thisTeacherQSet, setThisTeacherQSet] = useState([])

  const initialValues = {
    TeacherId: ''
  };


  const confirmTeacherId = useCallback(async (data) => {

    console.log(data.TeacherId)
    axios.get(`${BASE_URL}/teacher/teacherAllQuestionSet/${data.TeacherId}`)
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





  useEffect(() => {
    console.log("Teacher:", thisTeacherQSet)
  }, [thisTeacherQSet, teacherId]);



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

            <br /><br />
          </Form>

        </Formik>


      </div>



      <AddQuestions />

      <div>
        {/* {thisTeacherQuestionSetData.QuestionSetDATA.map((value) => { */}
        {thisTeacherQSet.map((value) => {
          return (
            <>


              <QuestionSetUpdate
                questionSetNo={value.questionSetNo}
                title={value.title}
                description={value.description}
                id={value.id}
              />




            </>

          )
        })}








      </div>
    </>

  )
}

export default reviewQuestions
