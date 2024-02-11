import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Question from './Question';
import Loading from '../../MarkPublic/Loading';

export default function Assessment() {
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
        const startTestButton = document.getElementById("startTest");
        const mainContent1 = document.getElementById("mainContent1");
        if (startTestButton.hidden === true) {
            startTestButton.hidden = false;
            mainContent1.hidden = true;
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
                                    <table className='m-auto w-2/5'>
                                        <h1 className='text-3xl mb-8 text-blue-300 text-center font-semibold'>Select an Assesment</h1>
                                        <tr>
                                            <td>
                                                <select
                                                    name="subject"
                                                    className="form-select rounded w-full text-center"
                                                    id="subject"
                                                    onChange={handleBranchChange}
                                                >
                                                    <option value="">Select Branch</option>
                                                    {data.map((element) => (
                                                        <option key={element.branch} value={element.branch}>
                                                            {element.branch}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <select
                                                    name="subject"
                                                    className="form-select rounded w-full text-center"
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
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <select
                                                    name="Anumber"
                                                    className="form-select rounded w-full text-center"
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
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <button onClick={startTest} href="#_" className="text-center rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-indigo-600 text-white">
                                                    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-indigo-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                                                    <span className="relative text-indigo-600 transition duration-300 group-hover:text-white ease">Start Assessment</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div id='startTest' hidden>
                                    <Question subject={formData.subject} number={formData.Anumber} />
                                </div>
                            </>
                        ))}
                </>
            )}
        </>
    );
}
