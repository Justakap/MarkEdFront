import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loading from './Loading';
import StayTuned from './StayTuned';

export default function Branches() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const resource = queryParams.get('resource');
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
            .then(response => {
                setBranches(response.data);
                setLoading(false);  // Set loading to false when data is fetched
            })
            .catch(err => {
                console.log(err);
                setLoading(false);  // Set loading to false in case of an error
            });
    }, []); // Empty dependency array for fetching data once when the component mounts


    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <Loading />
                </div>
            ) : <>
                {branches.filter((e) => e.resource === resource).length < 1 ? <>
                    <StayTuned></StayTuned></> : <>
                    <div className=" flex flex-wrap justify-evenly my-10">
                        {branches.filter((e) => e.resource === resource).map((branch) => (
                            <div key={branch.id} className="w-72 rounded overflow-hidden shadow-lg m-3 my-2">
                                <img
                                    className="w-full h-40"
                                    src={branch.image}
                                    alt="Sunset in the mountains"
                                />
                                <div className="px-2 py-1">
                                    <div className="text-center my-3 font-bold text-xl">

                                        <Link to={`/category?branch=${branch.branch}`} className="  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-base px-3 py-2 text-center ">

                                            {branch.branch} →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>}

            </>}
        </>
    )
}
