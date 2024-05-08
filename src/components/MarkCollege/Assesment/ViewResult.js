import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../MarkPublic/Loading';

export default function ViewResult(props) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [result, setResult] = useState([]);
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [noResult, setNoResult] = useState('');


    useEffect(() => {
        let effectExecuted = false;
        const timer = setTimeout(() => {
            const token = localStorage.getItem('token');
            if (token && !effectExecuted) {
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        const _id = JSON.parse(localStorage.getItem('user'));
                        axios.get(`${process.env.REACT_APP_API_BASE_URL}/userNew?_id=${_id}`)
                            .then(response => {
                                setUser(response.data);
                                setEmail(response.data.name);
                                if (!response.data.isPlus) {
                                    alert("Purchase the Premium First @ 299");
                                    navigate('/LogPricing');
                                }
                            })
                            .catch(err => console.log(err));

                    })
                    .catch(err => {
                        console.error('Error fetching user data:', err);
                        navigate('/login');
                    });
                effectExecuted = true;
            } else {
                navigate('/login');
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/LogAssessment/viewResult`)
            .then(response => {
                setResult(response.data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch(err => {
                console.error('Error fetching assessment results:', err);
                setLoading(false); // Set loading to false in case of error
            });
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/assesment`)
            .then(response => {
                setAssessments(response.data);
            })
            .catch(err => console.error('Error fetching assessments:', err));
    }, []);

    useEffect(() => {
        if (result.length > 0 && assessments.length > 0 && email) {
            const userResult = result.filter(e => e.name === email);
            if (userResult.length == 0) {
                setNoResult("No Results found for this User")
            }

        }
    }, [result, assessments, email]);

    if (loading || !result || !email) {
        return <div className="flex justify-center h-screen"><Loading /></div>;
    }

    return (
        <>
            <p>{noResult}</p>
            <div className="flex justify-between flex-wrap">
                {result
                    .filter(e => e.name === email)
                    .map((e, index) => (
                        <div className="w-fit m-auto flex flex-wrap" key={index}>
                            <div className="flex justify-between">
                                <div className="w-96 rounded overflow-hidden shadow-lg m-6 my-8">
                                    <p className='text-center font-bold text-blue-400 text-2xl'>{e.subject}</p>
                                    <p className='text-center font-bold text-green-400 text-2xl m-1'>Assessment {e.number}</p>
                                    <img className='w-12 m-auto' src={user.image} alt="" />
                                    <div className="px-3 pb-1">
                                        <div className="text-center font-bold text-purple-500 text-2xl m-2">
                                            {user.name}
                                        </div>
                                        <p className=' text-center font-bold text-black text-2xl m-2'>Assessment Score : {e.marks.toFixed(2)}%</p>
                                        <p className=' text-center font-bold text-emerald-600 text-md m-2'>Completed On : {new Date(e.time).toLocaleString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric',
                                            hour12: true // Use 12-hour clock
                                        })}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}
