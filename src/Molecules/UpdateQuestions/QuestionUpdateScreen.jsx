import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { BASE_URL } from "../../url";
import { useNavigate } from 'react-router-dom';
import {ChoiceUpdate} from "../UpdateChoices/ChoiceUpdate.jsx"


export const QuestionSetUpdateScreen = ({
    correctAnswer,
    image,
    module,
    qType,
    question,
    id


}) => {



    // const [thisQ, setThisQ] = useState([]);

    const [isEditing, setIsEditing] = useState(false)


    //Combine Props into a Single Object to prevent over render
    const [thisQ, setThisQ] = useState(() => ({
        correctAnswer,
        image,
        module,
        qType,
        question,
        id
    }));

    //Use useEffect to Set State Only Once to prevent over render
    useEffect(() => {
        setThisQ({
            correctAnswer,
            image,
            module,
            qType,
            question,
            id
        });
    }, [correctAnswer, image, module, qType, question]);



    const clickToUpdate = async (values) => {
        console.log(values)
        try {
            const response = await axios.put(`${BASE_URL}/question/updateQuestion/${id}`, values);
            console.log('Update response:', response.data);

        } catch (error) {
            console.error('Error updating data:', error.message);

        }
    };


    const clickToUpdateChoice = async (values) => {
        
        console.log("va",values)
        try {

            const response = await axios.put(`${BASE_URL}/choice/updateChoice/${choice.id}`, values);
            console.log('Update response:', response.data);
            values.preventDefault()

        } catch (error) {
            console.error('Error updating data:', error.message);

        }
        
    };


    const [isMCQ, setIsMCQ] = useState(false)


    const [choice, setChoice] = useState([]);
    // const [choice, setChoice] = useState(() => ({
    //     choice,
    //     image,

    // }));

    //Use useEffect to Set State Only Once to prevent over render
    useEffect(() => {
        setChoice({
            choice,
            image,
            id

        });
    }, []);





    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/choice/thisQuestionChoice/${id}`);
                setChoice(response.data);
                console.log(response.data)
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





    const [thisChoice, setThisChoice] = useState(() => ({
        // choice,
        // image,
        
    }));

    //return all the questions in a form
    console.log(choice.id)
    return (
        <>
            <Formik

                initialValues={thisQ}
                onSubmit={clickToUpdate}
                enableReinitialize

            >
                <Form className='bg-sky-100 rounded-lg border-4 border-indigo-600 m-1'>
                    <br /><label className=" m-2 p-1 font-semibold ">Question: </label>
                    <Field type="text" id="question" name="question" autoComplete="off" disabled={!isEditing}
                        className=" m-2 p-1 "
                    />


                    <br /><label className=" m-2 p-1 font-semibold ">Correct Answer: </label>
                    <Field type="text" id="correctAnswer" name="correctAnswer" autoComplete="off" disabled={!isEditing}
                        className=" m-2 p-1 "
                    />


                    <br /><label className=" m-2 p-1 font-semibold ">Module: </label>
                    <Field type="number" id="module" name="module" autoComplete="off" disabled={!isEditing}
                        className=" m-2 p-1 "
                    />



                    <br /><label className=" m-2 p-1 font-semibold ">Question Type: </label>
                    <Field type="text" id="qType" name="qType" autoComplete="off" disabled={!isEditing}
                        className=" m-2 p-1 "
                    />


                    <br /><label className=" m-2 p-1 font-semibold ">Image: </label>
                    <Field type="text" id="image" name="image" autoComplete="off" disabled={!isEditing}
                        className=" m-2 p-1 "
                    />



                    <br />
                    <button type="button" onClick={() => !isEditing ? setIsEditing(true) : setIsEditing(false)}
                        className=" m-2 p-1 font-semibold bg-yellow-200 rounded-lg border-2 border-amber-600"
                    >
                        {
                            isEditing ? "Cancel" : "Edit"
                        }
                    </button>
                    <button type="submit"
                        className=" m-2 p-1 font-semibold bg-fuchsia-300 rounded-lg border-2 border-purple-600 "
                    >Update</button>
                    <br /><br />

                        <ChoiceUpdate id={choice.id} choice={choice.choice} image={choice.image}/>
{/*                
                    {choice.length > 0 && ( // Check if choice has data
                        <div>
                            
                            
                           
                            {choice.map((choiceItem, index) => (
                                <Formik
                                    key={index} // Add a unique key for each choice form
                                    initialValues={choiceItem}
                                    onSubmit={clickToUpdateChoice}

                                 



                                    enableReinitialize
                                >
                                    
                                    <Form className='bg-gray-200 rounded-lg border-2 border-indigo-400 m-1'>
                                        <br /><label className=" m-2 p-1 font-semibold ">Choice {index + 1}: </label>
                                        <Field type="text" id="choice" name="choice" autoComplete="off" disabled={!isEditing}
                                            className=" m-2 p-1 "
                                        />


                                        <br /><label className=" m-2 p-1 font-semibold ">Image: </label>
                                        <Field type="text" id="image" name="image" autoComplete="off" disabled={!isEditing}
                                            className=" m-2 p-1 "
                                        />

                                        <br />
                                        <button type="button" onClick={() => !isEditing ? setIsEditing(true) : setIsEditing(false)}
                                            className=" m-2 p-1 font-semibold bg-yellow-200 rounded-lg border-2 border-amber-600"
                                        >
                                            {
                                                isEditing ? "Cancel" : "Edit"
                                            }
                                        </button>
                                        <button 
                                        // type="submit"

                                        type="submit"
                                        //     onClick={
                                        //         // clickToUpdateChoice
                                                
                                        //         async (values) => {
                                                    
                                        //         try {
                                                    
                                        //             const response = await axios.put(`${BASE_URL}/choice/updateChoice/${choiceItem.id}`, values);
                                        //             console.log('Update response:', response.data);
                                        //             console.log("choiceID",choiceItem.id)
                                                    
                                        
                                        //         } catch (error) {
                                        //             console.error('Error updating data:', error.message);
                                        //             console.log("choiceID",choiceItem.id)
                                        //         }

                                        //     }
                                        
                                        
                                        
                                        // }
                                            className=" m-2 p-1 font-semibold bg-fuchsia-300 rounded-lg border-2 border-purple-600 "
                                        >Update</button>
                                        <br /><br />
                                    </Form>
                                </Formik>
                            ))}
                        </div>)} */}






                </Form>
            </Formik>

        </>
    )
}





