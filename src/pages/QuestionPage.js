import React from 'react'
import axios from 'axios';
import '../App.css';
import { useEffect, useState } from 'react';
import { Quiz } from "../Molecules/QuizScreen/Quiz.tsx";
import { BASE_URL } from '../url.js';


function QuestionPage() {

        const [questions, setQuestions] = useState([]);
        const [loading, setLoading] = useState(true);
      
        
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(`${BASE_URL}/questions/questions`);
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

export default QuestionPage
