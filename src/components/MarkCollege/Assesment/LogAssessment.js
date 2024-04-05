import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Question from './Question';
import Loading from '../../MarkPublic/Loading';
import { Link, useNavigate } from 'react-router-dom';

export default function LogAssessment() {


    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Set a flag to track whether the effect has already been executed
        let effectExecuted = false;
        
        // Use setTimeout to delay the execution of the effect
        const timer = setTimeout(() => {
            const token = localStorage.getItem('token');
            if (token && !effectExecuted) {
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    const currentUser = JSON.parse(localStorage.getItem('user'));
                    setUser(currentUser);
                    setLoading(false);
                    if (currentUser && !currentUser.isPlus) {
                        alert("Purchase the Premium First @ 299")
                        navigate('/home');
                    }
                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                    navigate('/home');
                });
                effectExecuted = true;
            } else {
                setLoading(false);
                navigate('/login');
            }
        }, 200); // Delay of 1 second

        // Clear the timer if the component unmounts or the effect re-runs
        return () => clearTimeout(timer);
    }, [navigate]);



    const [assessments, setAssessments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [formData, setFormData] = useState({
        branch: '',
        semester: '',
        number: '',
        subject: '',
        Anumber: '',
    });

    useEffect(() => {
        setName("anant@gmail.com");
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`)
            .then(response => {
                setUsers(response.data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/assesment`)
            .then(response => setAssessments(response.data))
            .catch(err => console.log(err));

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`)
            .then(response => setSubjects(response.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
            .then(response => setData(response.data))
            .catch(err => console.log(err));
    }, []);

    const handleBranchChange = (e) => {
        const selectedBranch = e.target.value;
        setFormData({ ...formData, branch: selectedBranch, subject: '' }); // Reset semester when changing branch
    };

    const handleAssessmentNumberChange = (e) => {
        const selectedAssessmentNumber = e.target.value;
        setFormData({ ...formData, Anumber: selectedAssessmentNumber });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const startTest = () => {
        if (formData.branch != "" && formData.subject != "" ) {
            const startTestButton = document.getElementById("startTest");
            const mainContent1 = document.getElementById("mainContent1");
            if (startTestButton.hidden === true) {
                startTestButton.hidden = false;
                mainContent1.hidden = true;
            }
        }
        else {
            alert("Please Select all the Required Fields")
        }
    };

    return (
        <>

            {loading ? (
                <div className="flex  justify-center h-screen">
                    <Loading />
                </div>
            ) : (
                <>
                    {users
                        .filter((user) => user.email === name)
                        .map(element => (
                            <>
                                <div id="mainContent1" className='my-8' style={{ height: "55vh" }}>
                                    <div className="text-center mb-4">
                                        <div className="max-w-lg mx-auto p-6 bg-yellow-100 border border-yellow-300 rounded-md shadow-md">
                                            <p className="text-yellow-800 text-lg font-semibold">Note: Do Not Refresh the page while giving assessment!</p>
                                        </div>
                                    </div>
                                    <div className="text-center w-96 p-6 m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <h1 className='text-3xl mb-8 text-blue-600 font-semibold'>Select an Assessment</h1>
                                        {/* <hr className='my-4 w-4/5 m-auto' /> */}
                                        <div className="mb-3">
                                            <select
                                                name="subject"
                                                className="my-2 block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                                id="subject"
                                                onChange={handleBranchChange}
                                                required
                                            >
                                                <option value="">Select Branch</option>
                                                {data.map((element) => (
                                                    <option key={element.branch} value={element.branch}>
                                                        {element.branch}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <select
                                                name="subject"
                                                className="my-2 block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                                id="subject"
                                                onChange={handleInputChange}
                                                value={formData.subject}
                                            >
                                                <option value="">Select Subject</option>
                                                {subjects.filter((e) => e.branch === formData.branch).map((element) => (
                                                    <option key={element.subject} value={element.name}>
                                                        {element.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <select
                                                name="Anumber"
                                                className="my-2 block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                                id="subject"
                                                onChange={handleAssessmentNumberChange}
                                                value={formData.Anumber}
                                            >
                                                <option value="">Select Assessment Number</option>
                                                {assessments.filter((e) => e.subject === formData.subject).map((element) => (
                                                    <option key={element.number} value={element.number}>
                                                        {element.number}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <button onClick={startTest} className="block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50">
                                            Start Assessment
                                        </button>
                                    </div>


                                </div>

                                <div id='startTest' hidden>
                                    <Question subject={formData.subject} number={formData.Anumber} />
                                </div>
                            </>
                        ))}
                </>
            )}
        </>
        // <></>
    );
}

