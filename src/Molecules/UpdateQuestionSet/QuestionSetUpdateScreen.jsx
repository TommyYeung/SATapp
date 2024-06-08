import { React, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../url';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";

export const QuestionSetUpdateScreen = ({

}) => {

    const { id } = useParams();
    const [thisQSet, setThisQset] = useState([]);
 
    const [isEditing,setIsEditing]=useState(false)



    useEffect(() =>
        async function fetchData() {
            

            await axios.get(`${BASE_URL}/questionSet/questionSet/${id}`)
   
                .then((res) => {
                    console.log("all QSet:", res.data)
                    setThisQset(res.data)
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        console.error('Resource not found:', error.message);
                    } else {
                        console.error('Error fetching data:', error.message);
                    }
                });


        }, [id]);


        const clickToUpdate = async (values) => {
    
                try {
                  const response = await axios.put(`${BASE_URL}/questionSet/updateQuestionSet/${id}`, values);
                  console.log('Update response:', response.data);
                  
                } catch (error) {
                  console.error('Error updating data:', error.message);
                  
                }
              };

    return (
        <div>
            <Formik
            initialValues={thisQSet}
            onSubmit={clickToUpdate}
            enableReinitialize
            >
                <Form className='bg-sky-200 rounded-lg border-3 border-indigo-600'>
                    <br /><label className=" m-2 p-1 font-semibold ">Question Set No: </label>
                    <Field type="text" id="questionSetNo" name="questionSetNo"  autoComplete="off" disabled={!isEditing}
                    className=" m-2 p-1 "
                    />
                    
                    <br /><label className=" m-2 p-1 font-semibold ">Title: </label>
                    <Field type="text" id="title" name="title" autoComplete="off" disabled={!isEditing}
                    className=" m-2 p-1 "
                    />
                    
                    <br /><label className=" m-2 p-1 font-semibold ">Description: </label>
                    <Field type="text" id="description" name="description" autoComplete="off" disabled={!isEditing}
                    className=" m-2 p-1 "
                    />
                    <br />
                    <button type="button" onClick={()=>!isEditing?setIsEditing(true):setIsEditing(false)} 
                    className=" m-2 p-1 font-semibold bg-yellow-200 rounded-lg border-2 border-amber-600"
                    >
                        {
                            isEditing? "Cancel" : "Edit"
                    }
                    </button>
                    <button type="submit" 
                    className=" m-2 p-1 font-semibold bg-fuchsia-300 rounded-lg border-2 border-purple-600 "
                    >Update</button>
                    <br /><br />
                </Form>
            </Formik>
        </div>
    )
}

export default QuestionSetUpdateScreen



