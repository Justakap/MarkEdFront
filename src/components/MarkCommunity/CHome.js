import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import send from '../../images/send.png';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/MarkPublic/Loading';

export default function CHome(props) {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [userMail, setUserMail] = useState([])

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

    const { community, communityMessage, users } = props;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        message: '',
        communityCell: name,
        author: email,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!formData.message) {
            alert("Please Enter A Message")
        }
        else {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/communities/messages`, {
                    message: formData.message,
                    communityCell: name,
                    author: email
                });

                if (response.data === "sent") {
                    setFormData(({
                        message: ''
                    }));
                } else if (response.data === "sent1") {
                    alert("Message Sent");
                } else if (response.data === "nadded") {
                    alert("message not sent");
                }
            } catch (error) {
                console.error("Server Error:", error);
                alert("Server Error");
            }
        }

    }

    const [autoScroll, setAutoScroll] = useState(true);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (autoScroll && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [autoScroll, communityMessage]);

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const atBottom = scrollHeight - scrollTop === clientHeight;
        if (atBottom) {
            setAutoScroll(true);
        } else {
            setAutoScroll(false);
        }
    };

    return (
        <>
            <div className='my-8 flex flex-wrap'>
                <div className="container mx-auto shadow-lg rounded-lg">
                    {community.filter((e) => e.name === name).map((e) => (
                        <div key={e.id} className="flex flex-col md:flex-row justify-between bg-white">
                            {/* Community details */}
                            <div className="w-full md:w-2/5 border-r-0 md:border-r-2 px-5">
                                <div className="flex flex-col">
                                    <div className="font-semibold text-xl py-4">{e.name}</div>
                                    <img
                                        src={e.image}
                                        className="object-cover rounded-xl h-40"
                                        alt=""
                                    />
                                    <div className="font-semibold py-1">Created On : {new Date(e.dateCreated).toLocaleString('en-US', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: false // Use 12-hour clock
                                    })}, {new Date(e.dateCreated).toLocaleString('en-US', {
                                        day: 'numeric'
                                    })} {new Date(e.dateCreated).toLocaleString('en-US', {
                                        month: 'short',
                                        year: '2-digit'
                                    })}</div>
                                    <div className="font-light">
                                        Group Description : {e.description}
                                    </div>
                                    <p className='mt-2'>  Total Members : {e.member.length}</p>
                                </div>
                            </div>

                            {/* Message section */}
                            <div className="w-full md:w-1/2 px-5 flex flex-col justify-between">
                                <div className="h-80 p-3 rounded bg-slate-200 my-2 overflow-y-scroll noScroll " ref={scrollRef} onScroll={handleScroll}>
                                    {communityMessage.filter((a) => a.communityCell === name).map((e) => (
                                        <div key={e.id} className="flex my-5">
                                            <div className="flex justify-start mb-2">
                                                {users.filter((a) => a.name === e.author).map((e) => (
                                                    <img
                                                        src={e.image}
                                                        className="object-cover h-8 w-8 rounded-full"
                                                        alt=""
                                                    />
                                                ))}
                                                <div className="">
                                                    <div className="ml-2 py-2 px-4 bg-blue-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                                                        {e.message}
                                                    </div>
                                                    <div className="flex">
                                                        <div className="text-xs text-left mx-8">{new Date(e.sentTime).toLocaleString('en-US', {
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: false // Use 12-hour clock
                                                        })}
                                                        </div>
                                                        <div className="text-gray-500 text-xs text-left mx-8">~{e.author} </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="py-5 pt-2 flex mr-2">
                                    <input
                                        required
                                        onChange={handleInputChange}
                                        value={formData.message}
                                        className="w-full bg-gray-300 py-2 px-3 rounded-xl"
                                        type="text"
                                        placeholder="Enter A Message..."
                                        name="message"
                                    />
                                    <button onClick={sendMessage}><img className='h-10 p-1 w-10' src={send} alt="" /></button>
                                </div>
                            </div>

                            {/* List of top communities */}
                            <div className="flex flex-col w-full md:w-2/5 border-l-0 md:border-l-2 overflow-y-auto">
                                <div className="border-b-2 py-4 px-2">
                                    <input
                                        type="text"
                                        placeholder="Search Community"
                                        className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                                    />
                                </div>
                                <div className='overflow-y-scroll h-96 noScroll border-b-2'>
                                    <div className="flex flex-row py-1 px-2 justify-center items-center border-b-2 border-dashed border-blue-200">
                                        <div className="w-full text-center">
                                            <span className="text-lg font-semibold">Top Communities</span><br />
                                        </div>
                                    </div>
                                    {community.map((e) => (
                                        <div key={e.id} className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
                                            <div className="w-1/4 m-1 mx-2">
                                                <img
                                                    src={e.image}
                                                    className="object-cover h-12 w-12 rounded-full"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="w-full">
                                                <Link to={'/community/Dashboard?name=' + e.name} className="text-lg font-semibold">{e.name.slice(0, 15)}...</Link><br />
                                                <span className=' font-semibold text-black'>Category : </span><span className="text-gray-500">{e.category}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
