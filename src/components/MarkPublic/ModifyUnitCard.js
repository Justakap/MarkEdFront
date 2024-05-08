import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ModifyUnitCard(props) {
    let { subject } = props;
    console.log(subject)

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

    const handleUnitDelete = (e) => {
        const id = e.target.value;

        const confirmed = window.confirm("Are you Sure Want to delte")
        if (confirmed) {
            try {
                const response = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/deleteUnit/${id}`);
                window.location.reload();

                if (response.data == "done") {
                    alert("Unit delted successfully!");
                } else if (response.data === "exist") {
                    alert("Unit already exists.");
                } else if (response.data === "nadded") {
                    alert("Unit not added.");
                }
            } catch (error) {
                console.error("Server Error:", error);
                alert("Server Error");
            }
        } else {
            alert("Cancelled")
        }

    }

    return (

        <>


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
                                            <p className=' font-bold'> Weightage : {((100 / e.unit[0].totalUnits)).toFixed(2)}%</p>

                                        </td>

                                    </tr>
                                </table>
                            </div> */}
                        <button onClick={handleUnitDelete} value={e._id} class=" mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">
                            Delete
                        </button>
                    </div>

                </>
            ))}

        </>

    )
}
