import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default function Resources() {
    const [resource, setResource] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/resources`)
            .then(response => {
                setResource(response.data);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <Loading />
                </div>
            ) : (

                <div className=" flex flex-wrap justify-evenly my-10">
                    {resource.map((branch) => (
                        <div key={branch.id} className="w-72 rounded overflow-hidden shadow-lg m-3 my-2">
                            <img
                                className="w-full h-40"
                                src={branch.image}
                                alt="Sunset in the mountains"
                            />
                            <div className="px-2 py-1">
                                <div className="text-center my-3 font-bold text-xl">

                                    <Link to={`/Branches?resource=${branch.name}`} className="  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-base px-3 py-2 text-center ">

                                        {branch.name} →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}



