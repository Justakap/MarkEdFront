import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AddAssesment() {

    const [subject, setSubject] = useState([]);
    const [number, setNumber] = useState('');
    const [data, setData] = useState([]);
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

    async function submit(e) {
        e.preventDefault();

        try {
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/assesment/addAssesment`, {
                subject: formData.subject,
                number: number,
                TotalQuestion: TotalQuestion,
            })
                .then((res) => {
                    if (res.data === "added") {
                        alert("Assessment Added");
                        // history("/");
                    }
                    else if (res.data === "exist") {
                        alert("Assesment Already Exist");
                    }
                    else if (res.data === "nadded") {
                        alert("Not Added");
                    }
                })
                .catch((e) => {
                    alert("Server Error");
                    console.log(e);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <table className='w-3/5 border-0 m-auto my-3 '>
                <tbody>
                    <tr>
                        <td>Branch</td>
                        <td>
                            <select
                                name="branch"
                                className="form-select rounded w-4/5"
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
                        </td>
                    </tr>
                    <tr>
                        <td>Semester</td>
                        <td>
                            <select
                                name="semester"
                                className="form-select rounded w-4/5"
                                id="semester"
                                onChange={handleInputChange}
                                value={formData.semester}
                            >
                                <option value="">Select Semester</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Subject</td>
                        <td>
                            <select
                                name="subject"
                                className="form-select rounded w-4/5"
                                id="subject"
                                onChange={handleInputChange}
                                value={formData.subject}
                            >
                                <option value="">Select Subject</option>
                                {subject
                                    // eslint-disable-next-line
                                    .filter((filter) => filter.branch == formData.branch && filter.semester == parseInt(formData.semester, 10))
                                    .map((element) => (
                                        <option key={element.name} value={element.name}>
                                            {element.name}
                                        </option>
                                    ))}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Number</td>
                        <td>
                            <input className='rounded-lg w-2/5' onChange={(e) => { setNumber(e.target.value) }} type="text" /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>Total Question</td>
                        <td>
                            <input className='rounded-lg w-2/5' onChange={(e) => { setTotalQuestion(e.target.value) }} type="text" /><br />
                        </td>
                    </tr>
                    <tr>
                        <td className=' text-center' colSpan={2}>
                            <input onClick={submit} className='btn btn-outline-primary w-1/5 m-auto' type="submit" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}
