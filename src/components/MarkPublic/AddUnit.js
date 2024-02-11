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
            <div className="text-3xl font-bold m-3">Modify Unit</div>

            <table className='m-auto'>
                <tr>
                    <td>Select Branch</td>
                    <td>
                        <select required name="branch" onChange={handleInputChange} value={formData.branch}>
                            <option value="">Select Branch</option>
                            {branches.map((branch, index) => (
                                <option key={index} value={branch.branch}>{branch.branch}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Select semester</td>
                    <td>
                        <select required name="semester" onChange={handleInputChange} value={formData.semester}>
                            <option value="">Select semester</option>
                            {semesterCount.map((semester, index) => (
                                <option key={index} value={semester}>{semester}</option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        Select Subject
                    </td>
                    <td>
                        <select required name="subject" onChange={handleInputChange} value={formData.subject}>
                            <option value="">Select Subject</option>
                            {subject
                                .filter((filter) => filter.branch === formData.branch && filter.semester === parseInt(formData.semester, 10))
                                .map((element, index) => (
                                    <option key={index} value={element.name}>
                                        {element.name}
                                    </option>
                                ))}
                        </select>
                    </td>
                </tr>
                <tr >
                    <td>
                        <Link to={`/Modify/Unit/Add?Subject=${formData.subject}`} class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                            Next
                        </Link>
                    </td>

                </tr>
                <tr>
                    <td></td>
                </tr>
            </table>

        </>
    );
}
