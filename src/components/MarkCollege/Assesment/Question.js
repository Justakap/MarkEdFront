import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Result from './Result';
export default function Question(props) {
    let { subject, number } = props;
    const [questions, setQuestions] = useState([]);
    const [id, setId] = useState([]);
    const [marks, setMarks] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [assessments, setAssessments] = useState([]);

    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // axios.get(`${process.env.REACT_APP_API_BASE_URL}/home`)
        //     .then(res => {
        //         if (res.data.valid) {
        //             setName(res.data.username);
        //         } else {
        //             navigate('/login');
        //         }
        //     })
        //     .catch(err => console.log(err));

        // Fetch user data
        setName("anant@gmail.com");
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`)
            .then(response => setUsers(response.data))
            .catch(err => console.log(err));
    }, []); // Empty dependency array means this effect runs once after the initial render

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/question`)
            .then(response => setQuestions(response.data))
            .catch(err => console.log(err));
    }, []);



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/assesment`)
            .then(response => setAssessments(response.data))
            .catch(err => console.log(err));
    }, []);

    // eslint-disable-next-line
    const currentAssesment = assessments.find(q => q.subject == subject && q.number == number)?._id;

    useEffect(() => {
        // Log the updated state whenever selectedAnswer changes
        console.log(selectedAnswer);
    }, [selectedAnswer]);

    const [currentPage, setCurrentPage] = useState(1);
    const recordperPage = 1;
    const lastIndex = currentPage * recordperPage;
    const firstIndex = lastIndex - recordperPage;
    // eslint-disable-next-line
    const records = questions.filter((e) => (e.AssesmentId == currentAssesment)).slice(firstIndex, lastIndex);
    // eslint-disable-next-line
    const nPage = Math.ceil(questions.filter((e) => (e.AssesmentId == currentAssesment)).length / recordperPage);

    const handleRadioChange = (e, questionId) => {
        const selectedValue = e.target.value;
        setId(questionId);
        setSelectedAnswer(selectedValue);
    };
    // eslint-disable-next-line
    const ans = questions.find(q => q._id == id)?.ans;
    const nextPage = () => {
        if (currentPage < nPage) {
            setCurrentPage(currentPage + 1);
            // eslint-disable-next-line
            if (selectedAnswer && selectedAnswer == ans) {
                setMarks(marks + 1);
            }
        }
        // eslint-disable-next-line
        if (currentPage == nPage) {
            // eslint-disable-next-line
            if (selectedAnswer && selectedAnswer == ans) {
                setMarks(marks + 1);
                document.getElementById("nextButn").hidden = true;
                document.getElementById("submit").hidden = false;
            }
            else {
                document.getElementById("nextButn").hidden = true;
                document.getElementById("submit").hidden = false;
            }
        }

    };
    const showResult = () => {
        const result = document.getElementById("result");
        const mainContent = document.getElementById("mainContent");
        // eslint-disable-next-line
        if (result.hidden == true) {
            result.hidden = false
            mainContent.hidden = true
        }
        try {
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/assesment/result`, {
                marks: 100 * (marks / nPage), name, currentAssesment, status: true
            })
                .then(res => {
                    // eslint-disable-next-line
                    if (res.data == "added") {
                        alert("submitted")
                    }
                    // eslint-disable-next-line
                    else if (res.data == "nadded") {
                        alert("Not Submitted")
                    }


                }).catch(e => {
                    alert("Server Error")
                    console.log(e)
                })
        } catch (error) {
            console.log(error)
        }



    };


    const [time, setTime] = useState({ minutes: 0, seconds: 10 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => {
                const newSeconds = prevTime.seconds - 1;
                const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
                const updatedSeconds = newSeconds < 0 ? 59 : newSeconds;

                if (newMinutes <= 0) {
                    clearInterval(timer); // Stop the timer when time is up
                }

                return { minutes: newMinutes, seconds: updatedSeconds };
            });
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, []);

    return (
        <>

            {users
                .filter((user) => user.email === name)
                .map(element => (
                    <>
                        <div className="" id="mainContent">
                            <div className="flex justify-between bg-slate-300">
                                <div className="font-semibold p-2">Time left: {String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}</div>
                                <div className="font-semibold p-2">User : {element.name}</div>
                                <div className="font-semibold p-2">Total Questions: {nPage}</div>
                            </div>

                            <h1 className='text-3xl text-green-600 text-center font-bold m-2'>{subject}</h1>
                            <h1 className='text-3xl text-blue-500 text-center font-bold m-2'> {`Assessment ` + number}</h1>
                            {records.map((question, index) => (
                                <div className="flex flex-wrap my-10" key={question._id}>
                                    <div className="w-4/5 rounded overflow-hidden shadow-lg m-auto p-4">
                                        <p className="mb-4 font-bold" style={{ fontFamily: "'Raleway', sans-serif" }}>
                                            Ques {currentPage} . {question.question}
                                        </p>
                                        <hr className="w-full" />
                                        <div className="px-3 py-2">
                                            <div className="text-xl mb-4 text-left flex ">
                                                <table className='w-full   border-0'>
                                                    <tbody>
                                                        <tr className=' border-0' >
                                                            <td className=' border-0 '>
                                                                A <input
                                                                    key={`option-${question._id}-${1}`}
                                                                    className="m-2 cursor-pointer"
                                                                    name={question._id}
                                                                    value={1}
                                                                    type="radio"
                                                                    onChange={(e) => handleRadioChange(e, question._id)}
                                                                />
                                                                {question.opt1}
                                                            </td>
                                                            <td className=' border-0'>
                                                                B <input
                                                                    key={`option-${question._id}-${2}`}
                                                                    className="m-2 cursor-pointer"
                                                                    name={question._id}
                                                                    value={2}
                                                                    type="radio"
                                                                    onChange={(e) => handleRadioChange(e, question._id)}
                                                                />
                                                                {question.opt2}
                                                            </td>
                                                        </tr>
                                                        <tr className=' border-0'>
                                                            <td className=' border-0'>
                                                                C <input
                                                                    key={`option-${question._id}-${3}`}
                                                                    className="m-2 cursor-pointer"
                                                                    name={question._id}
                                                                    value={3}
                                                                    type="radio"
                                                                    onChange={(e) => handleRadioChange(e, question._id)}
                                                                />
                                                                {question.opt3}
                                                            </td>
                                                            <td className=' border-0'>
                                                                D <input
                                                                    key={`option-${question._id}-${4}`}
                                                                    className="m-2 cursor-pointer"
                                                                    name={question._id}
                                                                    value={4}
                                                                    type="radio"
                                                                    onChange={(e) => handleRadioChange(e, question._id)}
                                                                />
                                                                {question.opt4}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'center' }} className='m-2'>
                                <nav className='pagination'>
                                    <button onClick={nextPage} id='nextButn' className='mx-1 w-20 font-semibold btn btn-info border-blue-400 hover:bg-blue-600 hover:border-blue-400 bg-blue-500 text-white'>Save</button>
                                    <button onClick={showResult} id='submit' hidden className='mx-1 w-40 font-semibold btn btn-info border-green-400 hover:bg-green-600 hover:border-green-400 bg-green-500 text-white'>Submit</button>
                                </nav>
                            </div>
                        </div>

                        <div id="result" hidden>
                            <Result marks={marks} TotalQuestion={nPage} subject={subject} number={number}></Result>
                        </div>
                    </>
                ))}

        </>
    );
}
