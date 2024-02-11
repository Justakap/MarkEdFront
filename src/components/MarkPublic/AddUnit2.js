import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ModifyUnitCard from './ModifyUnitCard';
import axios from 'axios';

export default function AddUnit2() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const subject = queryParams.get('Subject');

    const [formData, setFormData] = useState({
        subject: subject,
        unitNumber: '',
        unitName: ''
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
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/modify/unit/add`, {
                subject: formData.subject,
                unitNumber: formData.unitNumber,
                unitName: formData.unitName
            });

            if (response.data === "added") {
                setSuccessMessage("Unit added successfully!");
                window.location.reload();
            } else if (response.data === "exist") {
                alert("Unit already exists.");
            } else if (response.data === "nadded") {
                alert("Unit not added.");
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
              <h1 className=' text-center text-3xl my-3'>Showing {subject} </h1>
            <div className='flex ml-6 flex-wrap'>
                <div className="text-center max-w-sm w-72 p-6 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add Unit</h5>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleInputChange} value={formData.unitNumber} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-1 mt-3' type="number" placeholder='Enter Unit Number' name="unitNumber" required />
                        <input onChange={handleInputChange} value={formData.unitName} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-2' type="text" placeholder='Enter Unit Name' name="unitName" required />
                        <button type="submit" className="mt-3 focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-800">Add Unit</button>
                    </form>
                </div>
                <ModifyUnitCard subject={subject} />
            </div>
        </>
    );
}
