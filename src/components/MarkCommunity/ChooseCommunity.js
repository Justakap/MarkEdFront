import React, { useState, useEffect } from 'react';
import axios from 'axios';
import send from '../../images/send.png';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ChooseCommunity({ community }) {
    const [userMail, setUserMail] = useState('');
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [foundCommunity, setFoundCommunity] = useState(null);
    const [currentCommunity, setCurrentCommunity] = useState(null); // Change to null initially
    const navigate = useNavigate();

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
                        const currentUser = JSON.parse(localStorage.getItem('user'));
                        setUser(currentUser);
                        setEmail(currentUser.name);
                        setUserMail(currentUser.email);

                        if (!currentUser.isPlus) {
                            alert("Purchase the Premium First @ 299");
                            navigate('/LogPricing');
                        }
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

    const handleJoinCommunity = (name) => {
        // const found = community.find((e) => e.name === name).member.includes(userMail);
        const CurrentCommunity = (community.find((e) => e.name === name))
        // console.log(userMail)
        const isMember = (CurrentCommunity.member.includes(userMail));
        if (isMember) {
            navigate(`/community/Dashboard?name=${name}`)
        } else {
            alert("Please Become a Member First")
        }
    };
    const becomeMember = (name) => {
        const CurrentCommunity = community.find(e => e.name === name);
        const isMember = CurrentCommunity && CurrentCommunity.member.includes(userMail);
    
        if (isMember) {
            // navigate(`/community/Dashboard?name=${name}`);
            alert("Already A Member")
        } else {
            const key = prompt("Enter A Key");
            if (key === "0101") {
                // If the key is correct, add the user as a member
                axios.put(`${process.env.REACT_APP_API_BASE_URL}/communities/${name}/add-member`, {
                    newMember: userMail
                })
                .then(response => {
                    // Handle successful addition if needed
                    navigate(`/community/Dashboard?name=${name}`);
                })
                .catch(error => {
                    // Handle error if needed
                    alert("Error adding member to the community.");
                });
            } else {
                alert("Access Denied");
            }
        }
    };
    


    return (
        <div className="pt-auto px-auto px-3 py-9">
            <div className="mx-auto shadow-lg rounded-lg overflow-y-scroll h-2/5 noScroll">
                <div className="flex flex-row justify-between">
                    <div className="overflow-y-scroll w-full noScroll">
                        {community.map((e) => (
                            <div key={e.id} className="flex flex-wrap border-b-2">
                                <div className="flex flex-row py-4 px-2 justify-between items-center w-full">
                                    <div className="flex items-center m-2">
                                        <img
                                            src={e.image}
                                            className="object-cover h-12 w-12 rounded-full mr-2"
                                            alt=""
                                        />
                                        <div className='ml-2'>
                                            <button
                                                onClick={() => handleJoinCommunity(e._id)} // Pass ID to handleJoinCommunity
                                                className="text-lg font-semibold "
                                            >
                                                {e.name.slice(0, 15)}...
                                            </button> <br />
                                            <span className="font-semibold text-black">Category: </span><span className="text-gray-500">{e.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap ml-2">
                                        <div className='m-2'>
                                            <button onClick={() => becomeMember(e.name)} className="btn btn-primary">Join Now</button>
                                        </div>
                                        <div className='m-2'>
                                            <button onClick={() => handleJoinCommunity(e.name)} className="btn btn-warning">Enter Community</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
