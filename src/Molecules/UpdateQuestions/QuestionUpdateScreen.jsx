import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { BASE_URL } from "../../url";
import { useNavigate } from 'react-router-dom';
import { ChoiceUpdate } from "../UpdateChoices/ChoiceUpdate.jsx"


export const QuestionSetUpdateScreen = ({
    correctAnswer,
    image,
    module,
    qType,
    question,
    id,
    qNo


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
        id,
        qNo
    }));

    //Use useEffect to Set State Only Once to prevent over render
    useEffect(() => {
        setThisQ({
            correctAnswer,
            image,
            module,
            qType,
            question,
            id,
            qNo
        });
    }, [correctAnswer, image, module, qType, question,qNo]);



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

        console.log("va", values)
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
                console.log("FetchChoice", response.data)
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
    // console.log("AllChoice:",choice)

    console.log("The Choice::::", typeof choice)

    const clickToAddChoice = useCallback(async (data) => {

        axios.post(`${BASE_URL}/choice/addChoice`, { "QuestionId": id })
        axios.post(`${BASE_URL}/choice/addChoice`, { "QuestionId": id })
        axios.post(`${BASE_URL}/choice/addChoice`, { "QuestionId": id })
        axios.post(`${BASE_URL}/choice/addChoice`, { "QuestionId": id })

            .then((res) => {
                console.log(res)
                axios.get(`${BASE_URL}/choice/thisQuestionChoice/${id}`)
                    .then((res) => {
                        setChoice(res.data)//make it update the ui to show the list
                    })
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {

                    console.error('Resource not found:', error.message);
                } else {

                    console.error('Error fetching data:', error.message);
                }
            });

    }, [id]);












    const qTypeOptions = [
        { value: "SQ", label: "SQ (Short Answer)" },
        { value: "MCQ", label: "MCQ (Multiple Choice)" },
      ];


      const handleQTypeChange = (e) => {
        setThisQ({ ...thisQ, qType: e.target.value });
      };





      const getIsShowAddChoiceButton = useCallback(() => {
        return thisQ.qType === "MCQ" && choice.length < 4;
      }, [thisQ.qType, choice.length]);



      const getIsShowChoice = useCallback(() => {
        return thisQ.qType === "MCQ" && choice.length >0;
      }, [thisQ.qType, choice.length]);












    return (
        <>
            <Formik

                initialValues={thisQ}
                onSubmit={clickToUpdate}
                enableReinitialize

            >
                <Form className='bg-sky-100 rounded-lg border-4 border-indigo-600 m-1'>


                    <br /><label className=" m-2 p-1 font-semibold ">Question Number: </label>
                    <Field type="text" id="qNo" name="qNo" autoComplete="off" disabled={!isEditing}
                        className=" m-2 p-1 "
                    />
                    
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



                    {/* <br /><label className=" m-2 p-1 font-semibold ">Question Type: </label>
                    <Field type="text" id="qType" name="qType" autoComplete="off" disabled={!isEditing}
                        className=" m-2 p-1 "
                    /> */}

<br />
  <label className="m-2 p-1 font-semibold">Question Type: </label>
  <Field as="select" id="qType" name="qType" disabled={!isEditing} className="m-2 p-1" onChange={handleQTypeChange}>
    {qTypeOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Field>
  <br />


                    <br /><label className=" m-2 p-1 font-semibold ">Image: </label>
                    <Field type="text" id="image" name="image" autoComplete="off" disabled={!isEditing}
                        className=" m-2 p-1 "
                    />







                    {/* {qType == "MCQ" && choice.length < 4 && (
                        <button
                            className="m-2 p-1 font-semibold bg-teal-300 rounded-lg border-2 border-purple-600"
                            onClick={clickToAddChoice}
                        >
                            Add Choices
                        </button>
                    )} */}

{getIsShowAddChoiceButton() && (
        <button
          className="m-2 p-1 font-semibold bg-teal-300 rounded-lg border-2 border-purple-600"
          onClick={clickToAddChoice}
        >
          Add Choices
        </button>
      )}





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


                    {/* {choice.map((choiceItem, index) => (
                        // <ChoiceUpdate id={choice.id} choice={choice.choice} image={choice.image}/>
                        <ChoiceUpdate id={choiceItem.id} choice={choiceItem.choice} image={choiceItem.image}/>
                    )
                    
                )
                } */}

                    {/* {choice.length > 0 && ( // Check if choice has data
  <div>
    
    {choice.map((choice) => (
      <ChoiceUpdate id={choice.id} choice={choice.choice} image={choice.image}/>))}

  </div>
)} */}


                </Form>
            </Formik>


            {getIsShowChoice() && ( // Check if choice has data
                <div className="bg-amber-500 bg-opacity-30 rounded-lg border-2  mx-16">



                    {choice.map((choiceItem, index) => (
                        <Formik
                            key={index} // Add a unique key for each choice form
                            initialValues={choiceItem}
                            onSubmit={clickToUpdateChoice}

                            enableReinitialize
                        >
                            
                            <Form className='border-indigo-400'>
                                <label className=" m-1 p-1 font-semibold ">Choice {index + 1}: </label>
                                <Field type="text" id="choice" name="choice" autoComplete="off" disabled={!isEditing}
                                    className=" m-1 p-1 "
                                    preventDefault
                                />


                                <label className=" m-1 p-1 font-semibold ">Image: </label>
                                <Field type="text" id="image" name="image" autoComplete="off" disabled={!isEditing}
                                    className=" m-1 p-1 "
                                    preventDefault

                                />

                                
                                <button type="button" onClick={() => !isEditing ? setIsEditing(true) : setIsEditing(false)}
                                    className=" m-1 p-1 font-semibold bg-yellow-200 rounded-lg border-2 border-amber-600"
                                    preventDefault
                                >
                                    {
                                        isEditing ? "Cancel" : "Edit"
                                    }
                                </button>
                                <button

                                    // type="submit"

                                    type="submit"
                                    preventDefault
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
                </div>)}





            {/* 
                </Form>
            </Formik> */}

        </>
    )
}





