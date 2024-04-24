import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../url.js';
import { useHistory } from 'react-router-dom';


function QuestionSetPage() {
    const [loading, setLoading] = useState(true);
    const [questionSet, setQuestionSet] = useState([]);


    useEffect(() => {
        //get all question set to list all out
        const fetchDataQuestionSet = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/questionSet/questionSet`);
                setQuestionSet(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataQuestionSet();
    }, []);


    console.log(questionSet)

    const questionSetData = {
        QuestionSetDATA: questionSet.map((questionSet) => ({
            id: questionSet.id,
            questionSetNo: questionSet.questionSetNo,
            title: questionSet.title,
            description: questionSet.description,

        }))

    }


    console.log(questionSetData)

    const history = useHistory();
    const onClickToEnterTest = (questionSetId)=>{
        history.push(`/questionSet/${questionSetId}`);
    }



    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (

                <div>
                    All Question Set





                    {questionSetData.QuestionSetDATA.map((value) => {
                        return (
                            <>
                            <div className='border-2 border-blue-500 bg-sky-200 m-2 p-2 rounded-xl '>
                                <div className='text-xl font-semibold'>{value.questionSetNo}</div>
                                <div className='text-lg font-normal'>Title: {value.title}</div>
                                <div className='text-sm font-light'>Description: {value.description}</div>
                                <button className='border-2 border-green-600 bg-emerald-200  m-2 px-1 rounded-xl'
                                
                                
                                    onClick={
                                        
                                            onClickToEnterTest(value.id) 
                                        
                                    }
                                
                                
                                >Enter Test!</button>
                            </div>
                                
                            </>

                        )
                    })}




                </div>



            )
            }
        </div>
    )
}

export default QuestionSetPage
