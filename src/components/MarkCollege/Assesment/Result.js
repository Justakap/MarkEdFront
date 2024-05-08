import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// marks: 100 * (marks / nPage), user, currentAssesment, status: true,subject,number
export default function Result(props) {

    let { correct, subject, number, incorrect, unattempted } = props;

    let totalQuestions = (4 * correct + 4 * incorrect + 4 * unattempted)

    let percent = ((4 * correct - 1 * incorrect) / totalQuestions) * 100

    const again = () => {
        window.location.reload()
    }
    const [image , setImage]=useState('https://i.pinimg.com/736x/51/4c/c0/514cc0aec0350e6b325271880ba85570.jpg')

    useEffect(() => {
        if (percent < 33) {
            setImage('https://media.istockphoto.com/id/1131230925/vector/check-marks-red-cross-icon-simple-vector.jpg?s=612x612&w=0&k=20&c=8oNof6faYkfOn1O6CAOHwpSmAhq3IK9hY_D3icbaQps=');
        }
    },);
    return (
        <>

            <div className=" w-fit m-auto">
                <div className=" flex flex-wrap ">

                    <div className="w-96 rounded overflow-hidden shadow-2xl shadow-slate-400  m-6 my-8">
                        <p className='text-center font-bold text-blue-400 text-3xl'> Assesment : {number}</p>
                        <p className='text-center font-bold text-green-400 text-2xl m-2'>{subject}</p>
                        <img className='w-40 m-auto' src={image} alt="" />
                        <div className="px-3 py-2">
                            <div className="text-center font-bold text-black text-2xl m-2">
                                Assesment Score : {percent.toFixed(2)}%
                            </div>
                            <div className="font-bold text-xl mb-4 text-center flex  flex-wrap justify-between">
                                <p className='text-center font-bold text-purple-500 text-xl m-1'> Total Questions: {totalQuestions/4}</p>
                                <p className='text-center font-bold text-green-500 text-xl m-1'> Correct : {correct} </p>
                                <p className='text-center font-bold text-red-500 text-xl m-1'> Incorrect: {incorrect}</p>
                                <p className='text-center font-bold text-yellow-500 text-xl m-1'> Unattempted: {unattempted}</p>
                            </div>
                            <div className="flex flex-wrap justify-between my-2">
                                <button onClick={again} className=' w-40 font-semibold btn btn-info border-blue-400 hover:bg-blue-600 hover:border-blue-400 bg-blue-500 text-white'>Attempt Again</button>
                                <Link to="/LogAssessment/viewResult" className=' w-40 font-semibold btn btn-info border-green-400 hover:bg-green-600 hover:border-green-400 bg-green-500 text-white'>View Results</Link>
                            </div>  
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}
