import React from 'react'
import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
import { Quiz } from "../Molecules/QuizScreen/Quiz.tsx";
import { BASE_URL } from '../url.js';
import { useParams, useNavigate } from 'react-router-dom';


function QuestionPage() {

        const [questions, setQuestions] = useState([]);
        const [loading, setLoading] = useState(true);
      
        const { id } = useParams(); 
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              /////the backend url
              const response = await axios.get(`${BASE_URL}/questionSet/questionSetAllQuestion/${id}`);
              setQuestions(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
        }, []);
      console.log(questions)
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

export default QuestionPage
