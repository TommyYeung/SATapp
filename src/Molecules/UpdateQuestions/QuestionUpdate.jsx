import { React, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { BASE_URL } from "../../url";
import { useParams, useNavigate } from 'react-router-dom';

import {QuestionSetUpdateScreen}from '../UpdateQuestions/QuestionUpdateScreen'

export const QuestionUpdate = ({

}) => {
    const { id } = useParams();

    const [allQ, setAllQ] = useState([]);
 
    const [isEditing,setIsEditing]=useState(false)



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




  return (
    <div>
        {allQ.map((allQ) => (
      <QuestionSetUpdateScreen   
      correctAnswer={allQ.correctAnswer}
    image={allQ.image}
    module={allQ.module}
    qType={allQ.qType}
    question={allQ.question}
    id={allQ.id}
    
    />))}

    </div>
  )
}


