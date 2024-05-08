import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import axios from 'axios';
import ModifySubjectCard from './ModifySubjectCard';

export default function AddSubject2() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const branch = queryParams.get('Branch');
    const semester = queryParams.get('semester');

    const [formData, setFormData] = useState({
        branch: branch,
        semester: semester,
        name: '',
        image: ''
    });

    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/Modify/Subject/add`, {
                branch: formData.branch,
                semester: formData.semester,
                name: formData.name,
                image: formData.image
            });

            if (response.data === "added") {
                setSuccessMessage("Subject added successfully!");
                window.location.reload();
            } else if (response.data === "exist") {
                alert("Subject already exists.");
            } else if (response.data === "nadded") {
                alert("Subject not added.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            alert("Server Error");
        }
    };

    return (
        <>

            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <h1 className=' text-center text-3xl my-3'>Showing {branch} Semester {semester}</h1>

            <div className='flex ml-6 flex-wrap '>
                <div className="text-center max-w-sm w-72 p-6 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add Subject</h5>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <input type="text" name='name' onChange={handleInputChange} value={formData.name} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-1 mt-3' placeholder='Enter Subject Name' required />
                        <input type="text" name='image' onChange={handleInputChange} value={formData.image} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-2' placeholder='Enter Image URL' required />

                        <button type="submit" className="mt-3 focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-800">Add Subject</button>
                    </form>
                </div>

                <ModifySubjectCard branch={formData.branch} semester={formData.semester}></ModifySubjectCard>
            </div>
        </>
    );
}
