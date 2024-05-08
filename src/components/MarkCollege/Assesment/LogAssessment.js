import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Question from './Question';
import Loading from '../../MarkPublic/Loading';
import { useNavigate } from 'react-router-dom';

export default function LogAssesment() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [assessments, setAssessments] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        branch: '',
        semester: '',
        Anumber: '',
        subject: '',
    });
    const [semesterCount, setSemesterCount] = useState([]);

    useEffect(() => {
        let effectExecuted = false;
        const timer = setTimeout(() => {
            const token = localStorage.getItem('token');
            if (token && !effectExecuted) {
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        const _id = JSON.parse(localStorage.getItem('user'));
                        axios.get(`${process.env.REACT_APP_API_BASE_URL}/userNew?_id=${_id}`)
                            .then(response => {
                                setUser(response.data);
                                // console.log(response.data)
                                if (!response.data.isPlus) {
                                    alert("Purchase the Premium First @ 299");
                                    navigate('/LogPricing');
                                }
                            })
                            .catch(err => console.log(err));
                        setLoading(false);

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
        }, 200);

        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/assesment`)
            .then(response => setAssessments(response.data))
            .catch(err => console.log(err));

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`)
            .then(response => setSubjects(response.data))
            .catch(err => console.log(err));

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
            .then(response => setData(response.data))
            .catch(err => console.log(err));
    }, []);

    const handleBranchChange = (e) => {
        const selectedBranch = e.target.value;
        setFormData({ ...formData, branch: selectedBranch, semester: '', subject: '' });
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
        const startTestButton = document.getElementById("startTest");
        const mainContent1 = document.getElementById("mainContent1");
        if (startTestButton.hidden === true) {
            startTestButton.hidden = false;
            mainContent1.hidden = true;
        }
    };

    useEffect(() => {
        if (formData.branch === "First Year") {
            setSemesterCount([1]);
        } else {
            setSemesterCount([3, 4, 5, 6, 7, 8]);
        }
        setFormData(prevState => ({ ...prevState, semester: '' }));
    }, [formData.branch]);

    return (
        <>
            {loading ? (
                <div className="flex justify-center h-screen">
                    <Loading />
                </div>
            ) : (
                <>
                    <div id="mainContent1" className='my-8' style={{ height: "55vh" }}>
                        <div className="text-center mb-4">
                            <div className="max-w-lg mx-auto p-6 bg-yellow-100 border border-yellow-300 rounded-md shadow-md">
                                <p className="text-yellow-800 text-lg font-semibold">Note: Do Not Refresh the page while giving assessment!</p>
                            </div>
                        </div>
                        <div className="text-center w-96 p-6 m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h1 className='text-3xl mb-8 text-blue-600 font-semibold'>Select an Assessment</h1>
                            <div className="mb-3">
                                <select
                                    name="branch"
                                    className="my-2 block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
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
                            </div>
                            <div className="mb-3">
                                <select
                                    name="semester"
                                    className="my-2 block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                    onChange={handleInputChange}
                                    value={formData.semester}
                                >
                                    <option value="">Select Semester</option>
                                    {semesterCount.map((semester, index) => (
                                        <option key={index} value={semester}>{semester}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    name="subject"
                                    className="my-2 block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                    onChange={handleInputChange}
                                    value={formData.subject}
                                >
                                    <option value="">Select Subject</option>
                                    {subjects.filter((filter) => filter.branch === formData.branch && filter.semester === parseInt(formData.semester, 10))
                                        .map((element, index) => (
                                            <option key={index} value={element.name}>
                                                {element.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select
                                    name="Anumber"
                                    className="my-2 block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
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
                        <Question user={user && user.name} subject={formData.subject} number={formData.Anumber} />
                    </div>
                </>
            )}
        </>
    );
}
