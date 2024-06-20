import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { BASE_URL } from "../../url";
import { useNavigate } from 'react-router-dom';


export const ChoiceUpdate = ({
    choice,
    image,
    id


}) => {



    // const [thisQ, setThisQ] = useState([]);

    const [isEditing, setIsEditing] = useState(false)


    //  useEffect(() => {
    //     setChoice({
    //         choice,
    //         image,
    //         id

    //     });
    // }, []);


        // const [choice, setChoice] = useState();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`${BASE_URL}/choice/thisQuestionChoice/${id}`);
    //             setChoice(response.data);
    //             console.log(response.data)
    //         } catch (error) {
    //             if (error.response && error.response.status === 404) {
    //                 console.error('Resource not found:', error.message);
    //             } else {
    //                 console.error('Error fetching data:', error.message);
    //             }
    //         }
    //     };

    //     fetchData();
    // }, [id]);





    const clickToUpdateChoice = async (values) => {
        
        console.log("va",values)
        try {

            const response = await axios.put(`${BASE_URL}/choice/updateChoice/${id}`, values);
            console.log('Update response:', response.data);
            values.preventDefault()

        } catch (error) {
            console.error('Error updating data:', error.message);

        }
        
    };


    const [isMCQ, setIsMCQ] = useState(false)



console.log("choiceImage",choice,image)

    return (
        <>
           

               
                    {/* {choice.length > 0 && ( // Check if choice has data */}
                        <div>
                            
                            
                            {/* Loop through choices and render individual forms */}
                            {/* {choice.map((choiceItem, index) => ( */}
                                <Formik
                                    // key={index} // Add a unique key for each choice form
                                    initialValues={ 
                                        {choice,
                                        image}}
                                    onSubmit={clickToUpdateChoice}

                                    enableReinitialize
                                >
                                    
                                    <Form className='bg-gray-200 rounded-lg border-2 border-indigo-400 m-1'>
                                        <br /><label className=" m-2 p-1 font-semibold ">Choice {}: </label>
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
                                      

                                        type="submit"
   
                                  
                                            className=" m-2 p-1 font-semibold bg-fuchsia-300 rounded-lg border-2 border-purple-600 "
                                        >Update</button>
                                        <br /><br />
                                    </Form>
                                </Formik>
                            {/* ))} */}
                        </div>)
                        {/* } */}






              
       

        </>
    )
}





