import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function AddAssesment2() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const subject = queryParams.get('Subject');

    const [number, setNumber] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [TotalQuestion, setTotalQuestion] = useState('');
    const [formData, setFormData] = useState({

        subject: subject,
        number: '',
        TotalQuestion: '',
    });

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/Modify/Assesment`, {
                subject: formData.subject,
                number: number,
                TotalQuestion: TotalQuestion,
            });

            if (response.data === "added") {
                alert("Assessment Added");
                // Optionally, you can reset form fields after successful submission
                setNumber('');
                setTotalQuestion('');
            } else if (response.data === "exist") {
                alert("Assesment Already Exist");
            } else if (response.data === "nadded") {
                alert("Not Added");
            }
        } catch (error) {
            console.error("Server Error:", error);
            alert("Server Error");
        }
    }

    return (
        <>
            <div className="text-3xl font-bold m-3 text-center">{subject} Assessment's</div>
            <hr className=' w-4/5 m-auto my-3' />
            <form onSubmit={submit}>
                <div className='flex ml-6 flex-wrap justify-center'>
                    <div className="text-center max-w-sm w-72 p-6 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Enter Details</h5>
                        <hr />
                        <input className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-1 mt-3' placeholder='Enter Assessment Number' value={number} onChange={(e) => setNumber(e.target.value)} type="text" /><br />
                        <input className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-1 mt-3' placeholder='Enter Total Question' value={TotalQuestion} onChange={(e) => setTotalQuestion(e.target.value)} type="text" /><br />
                        <button type="submit" className="mt-3 focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-800">Add Assessment</button>
                    </div>
                </div>
            </form>
        </>
    );
}
