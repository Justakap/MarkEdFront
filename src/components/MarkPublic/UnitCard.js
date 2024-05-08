import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar4 from './Navbar4';
import Navbar from './Navbar';

export default function UnitCard() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const subject = queryParams.get('subject');

    const token = localStorage.getItem('token');
    const navigation = token ? <Navbar4 /> : <Navbar />;

    const [unit, setUnit] = useState([]);
    const [loading, setLoading] = useState(true); // set initial loading state to true

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/unit`)
            .then(response => {
                setUnit(response.data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []); // Empty dependency array for fetching data once when the component mounts

    // Sort units by their number
    const sortedUnits = unit.sort((a, b) => a.unit[0].number - b.unit[0].number);

    return (<>
        {navigation}
        <div className='flex ml-6 flex-wrap'>

            {loading ? (
                <p>Loading...</p>
            ) : <>

                {sortedUnits.filter(e => e.subject === subject).length > 0 ?
                    <>{sortedUnits.filter(e => e.subject === subject).map(e => (
                        <>
                            <div key={e.unit[0].number} className="max-w-sm w-72 p-6 m-3 text-center bg-white border border-gray-200 rounded-lg shadow ">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Unit - {e.unit[0].number}</h5>
                                <hr className="my-2" />
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-green-500 ">{e.unit[0].name}</h5>
                                <div className="mb-3">
                                    <p className="font-bold text-blue-500">Subject: {e.subject}</p>
                                </div>
                                <hr />
                                <Link to={`/video?subject=${subject}&unit=${e.unit[0].number}`} className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Explore
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Link>
                            </div>
                        </>
                    ))}</> : <div className='my-48 mx-auto'>
                        <p className='font-bold text-3xl text-blue-400 '> Stay Tuned ! Our Team is Constantly Working Hard on Updating Courses</p>
                    </div>
                }

            </>
            }
        </div>
    </>
    );
}


