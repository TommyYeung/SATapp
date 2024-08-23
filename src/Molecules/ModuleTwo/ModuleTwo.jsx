


import { React, useEffect, useState, useCallback,memo } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { BASE_URL } from "../../url";
import { useParams, useNavigate } from 'react-router-dom';

import { QuestionSetUpdateScreen } from '../UpdateQuestions/QuestionUpdateScreen';
import { MCQ } from "../QuizComponents/MCQ.tsx";
import { SQ } from "../QuizComponents/SQ.tsx";
var LaTeX = require("react-latex")





export const ModuleTwo = 
// memo
(({
    moduleTwoQuestions,
    finishedModuleTwo
}) => {



    const handleClick = () => {
        
        finishedModuleTwo(true);
      };

    return (

        <div>
           
This is Module 2
<button onClick={handleClick}>Finished</button>
        </div>

    );
});
