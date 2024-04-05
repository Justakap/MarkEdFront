import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';

export default function LogResources() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Set a flag to track whether the effect has already been executed
        let effectExecuted = false;

        // Use setTimeout to delay the execution of the effect
        const timer = setTimeout(() => {
            const token = localStorage.getItem('token');
            if (token && !effectExecuted) {
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        const currentUser = JSON.parse(localStorage.getItem('user'));
                        setUser(currentUser);
                        setLoading(false);
                        if (currentUser.isPlus == false) {
                            alert("Purchase the Premium First @ 299")
                            navigate('/home');
                        }
                    })
                    .catch(err => {
                        console.error('Error fetching user data:', err);
                        navigate('/home');
                    });
                effectExecuted = true;
            } else {
                setLoading(false);
                navigate('/login');
            }
        }, 200); // Delay of 1 second

        // Clear the timer if the component unmounts or the effect re-runs
        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
            .then(response => {
                setBranches(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

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
            ) : (
                <div className=" flex flex-wrap justify-evenly">
                    {branches.map((branch) => (
                        <div key={branch.id} className="w-80 rounded overflow-hidden shadow-lg m-6 my-8">
                            <img
                                className="w-full h-40"
                                src={branch.image}
                                alt="Sunset in the mountains"
                            />
                            <div className="px-3 py-2">
                                <div className="font-bold text-xl mb-4 text-center">
                                    {branch.branch}
                                </div>
                                <div className="text-center  my-1 mb-4">
                                    <Link to={`/semester2?branch=${branch.branch}`} className="  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                        Explore →
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



