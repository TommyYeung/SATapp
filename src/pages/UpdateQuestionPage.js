import {React,useCallback} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../url.js';
import axios from 'axios';
import { QuestionSetUpdateScreen } from '../Molecules/UpdateQuestionSet/QuestionSetUpdateScreen'
import {QuestionUpdate} from '../Molecules/UpdateQuestions/QuestionUpdate.jsx'

function UpdateQuestionPage() {
 



  return (
    <div>
      

      <QuestionSetUpdateScreen/>



      <QuestionUpdate/>
    </div>
  )
}

export default UpdateQuestionPage
