import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AddUnit() {
    const [semesterCount, setSemesterCount] = useState([]);
    const [branches, setBranches] = useState([]);
    const [subject, setSubject] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        semester: '',
        image: '',
        branch: '',
    });

    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`)
            .then(response => setSubject(response.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
            .then(response => setBranches(response.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (formData.branch === "First Year") {
            setSemesterCount([1]);
        } else {
            setSemesterCount([3, 4, 5, 6, 7, 8]);
        }
        // Reset semester when branch changes
        setFormData(prevState => ({
            ...prevState,
            semester: ''
        }));
    }, [formData.branch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        setFormData({
            name: '',
            semester: '',
            image: '',
            branch: '',
        });
        setSuccessMessage('Subject added successfully!');
    };

    return (
        <>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            <div  className=" text-center  text-3xl font-bold m-3">Modify Unit</div>
            <hr className=' w-4/5 m-auto my-3' />
            <center>
                <div className='flex flex-wrap justify-center'>
                    <div className="text-center max-w-sm w-72 p-6 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Enter Details</h5>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            <select className=' my-2 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' required name="branch" onChange={handleInputChange} value={formData.branch}>
                                <option value="">Select Branch</option>
                                {branches.map((branch, index) => (
                                    <option key={index} value={branch.branch}>{branch.branch}</option>
                                ))}
                            </select>
                            <select className=' my-2 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' required name="semester" onChange={handleInputChange} value={formData.semester}>
                                <option value="">Select semester</option>
                                {semesterCount.map((semester, index) => (
                                    <option key={index} value={semester}>{semester}</option>
                                ))}
                            </select>
                            <select className=' my-2 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' required name="subject" onChange={handleInputChange} value={formData.subject}>
                                <option required value="">Select Subject</option>
                                {subject
                                    .filter((filter) => filter.branch === formData.branch && filter.semester === parseInt(formData.semester, 10))
                                    .map((element, index) => (
                                        <option key={index} value={element.name}>
                                            {element.name}
                                        </option>
                                    ))}
                            </select>
                            <br />
                            {/* <input onChange={handleInputChange} value={formData.unitName} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-2' type="text" placeholder='Enter Unit Name' name="unitName" required /> */}
                            <Link to={`/Modify/Unit/Add?Subject=${formData.subject}`} className="mt-8 focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-800">Next</Link>
                        </form>
                    </div>
                </div>
            </center>
        </>
    );
}
