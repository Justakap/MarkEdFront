import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function UnitCard() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const subject = queryParams.get('subject');

    const [unit, setUnit] = useState([]);
    const [Loading, setLoading] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/unit`)
            .then(response => {
                setUnit(response.data);
                setLoading(false);  // Set loading to false when data is fetched
            })
            .catch(err => {
                console.log(err);
                setLoading(false);  // Set loading to false in case of an error
            });
    }, []); // Empty dependency array for fetching data once when the component mounts




    return (
        <>
            <div className='flex ml-6 flex-wrap'>
                {unit.filter((e) => e.subject == subject).map((e) => (
                    <>

                        <div class="max-w-sm w-72 p-6 m-3 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 class="mb-2 text-2xl   font-bold tracking-tight text-gray-900 dark:text-white">Unit - {e.unit[0].number}</h5>
                            <hr className=' my-2' />
                            <h5 class="mb-2 text-xl   font-bold tracking-tight text-green-500 dark:text-white">{e.unit[0].name}</h5>

                            <div className=' mb-3'>
                                <p className=' font-bold text-blue-500'> Subject  : {e.subject}</p>
                            </div>
                            <hr />
                            {/* <div class="mb-1 font-normal  justify-between text-gray-700 dark:text-gray-400">
                                <table className=' text-sm'>
                                    <tr>
                                        <td>
                                            <p className=' font-bold'>Total Videos : {e.unit[0].totalVideos}</p>

                                        </td>
                                        <td>
                                            <p className=' font-bold'> Weightage : {((100/e.unit[0].totalUnits)).toFixed(2)}%</p>

                                        </td>

                                    </tr>
                                </table>
                            </div> */}
                            <Link to={`/video?subject=${subject}&unit=${e.unit[0].number}`} class="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Explore
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>

                    </>
                ))}
            </div>
        </>
    )
}





