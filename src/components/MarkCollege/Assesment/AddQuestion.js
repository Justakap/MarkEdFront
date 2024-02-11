import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './addQues.css'

export default function AddQuestion() {

    const [subject, setSubject] = useState([]);
    const [data, setData] = useState([]);
    const [question, setQuestion] = useState('')
    const [opt1, setOpt1] = useState('')
    const [opt2, setOpt2] = useState('')
    const [opt3, setOpt3] = useState('')
    const [opt4, setOpt4] = useState('')
    const [ans, setAns] = useState('')
    const [assesment, setAssesment] = useState([])
    // const [AssesmentId, setAssesmentId] = useState([])
    // const [TotalQuestion, setTotalQuestion] = useState('')
    const [formData, setFormData] = useState({
        branch: '',
        semester: '',
        number: '',
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/assesment/addAssesment`)
            .then(response => setAssesment(response.data))
            .catch(err => console.log(err));
    }, []);

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
        setFormData({ ...formData, branch: selectedBranch, semester: '' }); // Reset semester when changing branch



    };
    const TotalQuestion = assesment.find(q => q.subject === formData.subject && q.number === parseInt(formData.number, 10))?.TotalQuestion;
    const AssesmentId = assesment.find(q => q.subject === formData.subject && q.number === parseInt(formData.number, 10))?._id;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData.number)
    };
    async function submit(e) {
        e.preventDefault()

        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/assesment/addQuestion`, {
                AssesmentId, question, opt1, opt2, opt3, opt4, ans
            })
                .then(res => {
                    // eslint-disable-next-line
                    if (res.data == "added") {
                        alert("Question Added");


                    }
                    // eslint-disable-next-line
                    else if (res.data == "nadded") {
                        alert("Not Added")
                    }
                }).catch(e => {
                    alert("Server Error")
                    console.log(e)
                })
        } catch (error) {
            console.log(error)
        }
    }






    const questionElements = [];

    for (let index = 1; index <= TotalQuestion; index++) {
        questionElements.push(
            <>



                <div className="flex flex-wrap my-10" key={question._id}>
                    <div className="w-4/5 rounded overflow-hidden shadow-lg m-auto p-4">
                        <p className="mb-4 font-bold w-full" style={{ fontFamily: "'Raleway', sans-serif" }}>
                            < input placeholder={`Enter Question ${index}`} className='w-full rounded-lg' onChange={(e) => { setQuestion(e.target.value) }} type="text" /><br />
                        </p>
                        <hr className="w-full" />
                        <div className="px-3 py-2">
                            <div className="text-xl mb-4 text-left flex ">
                                <table className='w-full   border-0'>
                                    <tbody>
                                        <tr className=' border-0' >
                                            <td className=' border-0 '>
                                                <input placeholder='Option 1 ' className='rounded-lg' onChange={(e) => { setOpt1(e.target.value) }} type="text" /><br />
                                            </td>
                                            <td className=' border-0 '>
                                                <input placeholder='Option 2' className='rounded-lg' onChange={(e) => { setOpt2(e.target.value) }} type="text" /><br />
                                            </td>

                                        </tr>
                                        <tr className=' border-0' >
                                            <td className=' border-0 '>
                                                <input placeholder='Option 3' className='rounded-lg' onChange={(e) => { setOpt3(e.target.value) }} type="text" /><br />
                                            </td>
                                            <td className=' border-0 '>
                                                <input placeholder='Option 4' className='rounded-lg' onChange={(e) => { setOpt4(e.target.value) }} type="text" /><br />
                                            </td>

                                        </tr>
                                        <tr className=' border-0' >
                                            <td className=' border-0 '>
                                                <select className='rounded-lg' onChange={(e) => { setAns(e.target.value) }} name="" id="">
                                                    <option className='rounded-lg ' value={""}> Answer Option </option>
                                                    <option className='rounded-lg' value={1}>1</option>
                                                    <option className='rounded-lg' value={2}>2</option>
                                                    <option className='rounded-lg' value={3}>3</option>
                                                    <option className='rounded-lg' value={4}>4</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr className='border-0'>
                                            <td className=' border-0  ' colSpan={2}>
                                                <input onClick={submit} value="Add Question" className='btn btn-primary w-full bg-blue-500' type="submit" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }






    return (
        <>
            <h1 className='my-4 text-center text-3xl text-blue-400 font-semibold'>Add Question in the Assesment</h1>

            <table className='w-3/5 border-0 m-auto my-3'>
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
                                .filter((filter) => filter.branch === formData.branch && filter.semester === parseInt(formData.semester, 10))
                                .map((element) => (
                                    <option key={element.name} value={element.name}>
                                        {element.name}
                                    </option>
                                ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        Number
                    </td>
                    <td>

                        <input className='form-text w-4/5 rounded m-1' type="number" onChange={handleInputChange} name="number" id="" /><br />
                    </td>
                </tr>
                <tr>
                    <td>
                        Assesment Id
                    </td>
                    <td>

                        <input className='form-text w-4/5 rounded m-1' type="text" value={AssesmentId} readOnly /><br />
                    </td>
                </tr>
            </table>









            {questionElements}



        </>
    )
}
