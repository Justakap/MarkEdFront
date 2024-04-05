import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddAssesment() {

    const [subject, setSubject] = useState([]);
    const [number, setNumber] = useState('');
    const [data, setData] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [semesterCount, setSemesterCount] = useState([]);
    const [TotalQuestion, setTotalQuestion] = useState();
    const [formData, setFormData] = useState({
        branch: '',
        semester: '',
        subject: '',
        number: '',
        TotalQuestion: '',
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
            .then(response => setData(response.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`)
            .then(response => setSubject(response.data))
            .catch(err => console.log(err));
    }, []);

    const handleBranchChange = (e) => {
        const selectedBranch = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            branch: selectedBranch,
            semester: '', // Reset semester when changing branch
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(subject)
    };


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


  



    
    return (
        <>


            <>
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}
                <div className=" text-center  text-3xl font-bold m-3">Add An Assesment</div>
                <hr className=' w-4/5 m-auto my-3' />
                <center>
                    <div className='flex flex-wrap justify-center'>
                        <div className="text-center max-w-sm w-72 p-6 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Enter Details</h5>
                            <hr />
                            {/* <form onSubmit={handleSubmit}> */}
                            <select
                                name="branch"
                                className=' my-2 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' required
                                id="branch1"
                                onChange={handleBranchChange}
                                value={formData.branch}
                            >
                                <option value="">Select Branch</option>
                                {data.map((element) => (
                                    <option key={element.branch} value={element.branch}>
                                        {element.branch}
                                    </option>
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
                          
                          <Link to={`/Modify/Assesment/Add?Subject=${formData.subject}`} className="mt-8 focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-800">Next</Link>
                            {/* </form> */}
                        </div>
                    </div>
                </center>
            </>
           
        </>
    );
}
