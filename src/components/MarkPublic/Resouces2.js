import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Resouces2() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const param1 = queryParams.get('branch');

    const [selectedSemester, setSelectedSemester] = useState(null);
    const [subject, setSubject] = useState([]);
    const [semesterCount, setSemesterCount] = useState([]);
    const [firstText, setFirstText] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`)
            .then(response => setSubject(response.data))
            .catch(err => console.log(err));
        if (param1 === "First Year") {
            setSemesterCount([1]);
            setFirstText("Note : All Subjects are available in First Semester Tab Only")
        } else {
            setSemesterCount([3, 4, 5, 6, 7, 8]);
        }
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
        semester.hidden = true;
        if (subject.filter((filtered) => (filtered.semester === selectedSemester && filtered.branch === param1)).length < 1) {
            semesterHeadText.innerHTML = "No Results Available";
            semesterText.hidden = true;
        }
        else {
            semesterHeadText.innerHTML = `${param1} Sem ${selectedSemester}`;
            semesterText.hidden = true;
        }

    }




    return (
        <>
            <div className='text-center m-2'>
                <h1 id='semesterHeadText' className=' font-bold text-3xl text-blue-400 '>Exploring {param1}</h1>
            </div>
            <h2 id='semesterText' className=' font-bold text-3xl text-emerald-500 text-center my-4'>Select Semester</h2>

            <div className="flex flex-wrap justify-around" id="semester">

                {semesterCount.map((semester) => (
                    <button
                        key={semester}
                        value={semester}
                        onClick={() => handleSemesterClick(semester)}
                        className={`circle px-8 text-3xl py-6 mx-10 ml-16 my-5 bg-blue-500 rounded-full text-white ${selectedSemester === semester ? 'bg-green-500' : ''}`}
                    >
                        {semester}
                    </button>
                ))}
            </div>
            <h1 id='semesterHeadText' className='text-center mb-2 font-bold text-xl text-black '>{firstText}</h1>


            <tbody className='hidden ' id="subjectList">



                <div className=" flex flex-wrap">
                    {subject.filter((filtered) => (filtered.semester === selectedSemester && filtered.branch === param1)).map((element, index) => (
                        <div key={element.id} className="w-72 rounded overflow-hidden shadow-lg m-6 my-8">
                            <img
                                className="w-full h-40"
                                src={element.image}
                                alt="Sunset in the mountains"
                            />
                            <div className="px-3 py-2">
                                <div className="font-bold text-xl mb-4 text-center">
                                    {element.name}
                                </div>
                                <div className="text-center  my-1 mb-4">
                                    <Link to={`/unit?subject=${element.name}`} className="  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                        Explore →
                                    </Link>
                                </div>
                                {/* <div className="text-center  my-1 mb-4">
                                    <Link to={`/video?subject=${element.name}`} className="  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                        Explore →
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </tbody>
        </>
    );
}
