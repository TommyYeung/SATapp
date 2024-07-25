


import { React, useEffect, useState, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { BASE_URL } from "../../url";
import { useParams, useNavigate } from 'react-router-dom';

import { QuestionSetUpdateScreen } from '../UpdateQuestions/QuestionUpdateScreen';

var LaTeX = require("react-latex")



export const LaTexDisplay = ({ }) => {

 const fraction = `$$\\frac{1}{2}$$ abc`



    return (
        <div>
            LaTexDisplay
            <br />
            <br />
            <div className='text-2xl font-semibold'>

                <LaTeX >
                    {fraction}
                </LaTeX>

            </div>






        </div>

    );
};
