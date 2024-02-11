import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function ModifySubjectCard(props) {
    let { branch, semester } = (props)
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const param1 = queryParams.get('branch');


    const [selectedSemester, setSelectedSemester] = useState(null);
    const [subject, setSubject] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`)
            .then(response => setSubject(response.data))
            .catch(err => console.log(err));

    });


    return (
        <>
            

            {subject.filter((filtered) => (filtered.semester == semester && filtered.branch == branch)).map((element, index) => (
                <div key={element.id} className="w-72  rounded-lg overflow-hidden shadow-lg m-3 my-8">
                    <img
                        className="w-full h-40"
                        src={element.image}
                        alt="Sunset in the mountains"
                    />
                    <div className="px-3 py-2">
                        <div className="font-bold text-xl mb-1 text-center">
                            {element.name}
                        </div>
                        <div className="text-center">
                            <Link class=" my-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">
                                Delete
                            </Link>
                        </div>

                    </div>
                </div>
            ))}

        </>
    )
}
