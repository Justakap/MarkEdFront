import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import StayTuned from './StayTuned';

export default function Resouces2(props) {
    const { branch } = props
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const param1 = queryParams.get('branch');


    const [selectedSemester, setSelectedSemester] = useState(null);
    const [subject, setSubject] = useState([]);
    const [semesterCount, setSemesterCount] = useState([]);
    const [firstText, setFirstText] = useState();

    const selectedBranchDetails = branch.filter((e) => e.branch === param1)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`)
            .then(response => setSubject(response.data))
            .catch(err => console.log(err))
    }, [param1]);



    const changeVisible = () => {
        const myElement = document.getElementById('subjectList');
        myElement.classList.remove('hidden');
        myElement.classList.add('visible');
    }

    const handleSemesterClick = (semester) => {
        // Do something with the selected semester value
        changeVisible();
        setSelectedSemester(semester);
    };
    if (selectedSemester) {
        const semester = document.getElementById("semester")
        const semesterText = document.getElementById("semesterText")
        const semesterHeadText = document.getElementById("semesterHeadText")
        // semester.hidden = true;
        if (subject.filter((filtered) => (filtered.semester === selectedSemester && filtered.branch === param1)).length < 1) {
            semesterHeadText.innerHTML = "Stay Tuned Our Team is Constantly Working Hard on Updating Courses";
            semesterText.hidden = true;
        }
        else {
            // semesterHeadText.innerHTML = `${param1} Sem ${selectedSemester}`;
            semesterText.hidden = true;
        }

    }
    const check = subject.filter((filtered) => (filtered.semester === selectedSemester && filtered.branch === param1)).length < 1



    return (
        <>
            <div className='text-center m-2'>
                {check ? <></> : <><h1 id='semesterHeadText1' className=' my-2 font-bold text-3xl text-blue-400 '>Exploring {param1}</h1></>}

                {check ? <><h1 id='semesterHeadText' className=' my-1 font-bold text-3xl text-blue-400 '>Exploring {param1}</h1></> : <></>}
            </div>
            <h2 id='semesterText' className=' font-bold text-3xl text-emerald-500 text-center'>Select Category</h2>

            <div className="flex flex-wrap justify-around" id="semester">
                {selectedBranchDetails && selectedBranchDetails.length > 0 && (
                    selectedBranchDetails[0].subBranches.map((e) => (
                        <>
                            <button
                                key={e.value}
                                value={e.value}
                                onClick={() => handleSemesterClick(e.value)}
                                className={` font-serif px-1 mt-4 py-2 bg-blue-500 rounded-md text-white ${selectedSemester === e.value ? 'bg-green-500' : ''}`}
                            >
                                {e.typeName} {e.display ? <>: {e.display}</> : <></>}
                            </button>

                        </>
                    ))
                )}
            </div>
            <h1 id='semesterHeadText' className='text-center mb-2 sm:text-xl font-bold text-sm text-black '>{firstText}</h1>
            <tbody className=' ' id="subjectList">

                {selectedSemester ? <><div className=" flex flex-wrap  justify-around">

                    {subject.filter((filtered) => (filtered.semester == selectedSemester && filtered.branch === param1)).map((element, index) => (

                        <div key={element.id} className="w-72 rounded overflow-hidden shadow-lg m-2 my-7">
                            <img
                                className="w-full h-40"
                                src={element.image}
                                alt="Sunset in the mountains"
                            />
                            <div className="px-3 py-2">

                                <div className="text-center  my-2">
                                    <Link to={`/unit?subject=${element.name}`} className="  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 w-fit py-2.5 text-center ">
                                        {element.name.slice(0, 25)}...  →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div></> : <> <div className="mt-72"></div> </>}
            </tbody>
        </>
    );
}
