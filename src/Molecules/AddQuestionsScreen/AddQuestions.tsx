import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { BASE_URL } from "../../url";
import "../../App.css";
import "../../addquestions.css";

type addQuestionsProps = {};

export const AddQuestions: React.FC<addQuestionsProps> = () => {

    const [numChoices, setNumChoices] = useState(0);

    const [mcq, setMCQ] = useState(false);
    const initialValues = {
        questionNumber: "",
        question: "",
        choice: [],
        correctAnswer: "",
        questionType: "",
        module: "",
    };

    const validationSchema = Yup.object().shape({
        questionNumber: Yup.number().required("Question Number is required"),
        question: Yup.string().required("Question is required"),
        // choice: Yup.string().when('questionType', {
        //     is: 'MCQ',
        //     then: Yup.string().required('Choice is required for MCQ'),
        // }),
        correctAnswer: Yup.string().required("Correct Answer is required"),
        questionType: Yup.string().required("Question Type is required"),
        module: Yup.string().required("Module is required"),
    });

    const onSubmit = (data) => {
        // console.log(data);

        // axios.post(`${BASE_URL}/questions`, data)
        //     .then((res) => console.log(res, "ADDED TO DATABASE"));
         // Format choices into an array
    const choices = [];
    for (let i = 0; i < numChoices; i++) {
        choices.push(data[`choice${i}`]);
    }
    data.choices = choices;
        axios.post(`${BASE_URL}/addQuestions`,data)
  .then((res) => {
    console.log("ADDED",res)
  })
  .catch((error) => {
    if (error.response && error.response.status === 404) {
      console.error('Resource not found:', error.message);
    } else {
      console.error('Error fetching data:', error.message);
    }
  });
    };



    const handleChoiceChange = (event) => {
        const numChoices = parseInt(event.target.value);
        setNumChoices(numChoices);
    };

    return (
        <div className="bg-indigo-100 rounded-lg p-4">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                
            >
                <Form className="border">
                    <br /><label>Question Number: </label>
                    <Field type="text" id="questionNumber" name="questionNumber" placeholder="Question Number" autoComplete="off" />
                    <br /><ErrorMessage name="questionNumber" component="small" />
                    <br /><label>Question: </label>
                    <Field type="text" id="question" name="question" placeholder="Question" autoComplete="off" />
                    <br /><ErrorMessage name="question" component="small" />
                    <br /><label>Question Type: </label>
                    <label>
                        <Field type="radio" id="mcq" name="questionType" value="MCQ" onClick={() => setMCQ(true)} />
                        MCQ
                    </label>
                    <label>
                        <Field type="radio" id="sq" name="questionType" value="SQ" onClick={() => setMCQ(false)} />
                        SQ
                    </label>
                    <br /><ErrorMessage name="questionType" component="small" />
                    {/* {mcq && (
                        <>
                            <br /><label>Choice:</label>
                            <Field type="text" id="choice" name="choice" placeholder="Choice" autoComplete="off" />
                            <br /><ErrorMessage name="choice" component="small" />
                        </>
                    )} */}

                        {mcq && (
                        <>
                            <br />
                            <label htmlFor="numChoices">Number of Choices:</label>
                            <Field as="select" id="numChoices" name="numChoices" onChange={handleChoiceChange}>
                                <option value="0">Select number of choices</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Field>
                            <br />
                            {numChoices > 0 && (
                                <>
                                    {Array.from({ length: numChoices }).map((_, index) => (
                                        <React.Fragment key={index}>
                                            <label>Choice {index + 1}:</label>
                                            <Field type="text" id={`choice${index}`} name={`choice${index}`} placeholder={`Choice ${index + 1}`} autoComplete="off" />
                                            <br />
                                        </React.Fragment>
                                    ))}
                                    <ErrorMessage name="choices" component="small" />
                                </>
                            )}
                        </>
                    )}

                    <br /><label>Correct Answer: </label>
                    <Field type="text" id="correctAnswer" name="correctAnswer" placeholder="Correct Answer" autoComplete="off" />
                    <br /><ErrorMessage name="correctAnswer" component="small" />
                    <br /><label>Module: </label>
                    <Field type="text" id="module" name="module" placeholder="Module 1/2" />
                    <br /><ErrorMessage name="module" component="small" />
                    <br /><button type="submit" className="bg-indigo-200 rounded-xl">Add Question</button>
                </Form>
            </Formik>
        </div>
    );
};
