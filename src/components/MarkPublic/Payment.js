import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loading from './Loading';

export default function Payment() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = Number(queryParams.get('id'));
    if (id > 2) {
        navigate("/pricing")
    }

    const courses = [

        {
            id: 1,
            name: "Premium",
            price: 299,

        },
        {
            id: 2,
            name: "Organization",
            price: 4999,

        },

        // Add more choices as needed
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    const currentUser = JSON.parse(localStorage.getItem('user'));
                    console.log(currentUser);
                    setUser(currentUser);
                    setName(user.email);

                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [navigate]);



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`)
            .then(response => {
                setUsers(response.data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []); // Empty dependency array means this effect runs once after the initial render

    const generateRandomSixDigitNumber = () => {
        const min = 100000; // Minimum value (inclusive)
        const max = 999999; // Maximum value (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomSixDigitNumber = generateRandomSixDigitNumber();

    const ChangeStatus = async (e) => {
        e.preventDefault();


        try {
            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/updateStatus/${user._id}`);

            if (response.data === "updated") {
                navigate("/pSuccess")
            } else if (response.data === "exist") {
                alert("Unit already exists.");
            } else if (response.data === "nadded") {
                alert("Unit not added.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            alert("Server Error");
        }
    };
    return (


        courses.filter((e) => e.id === id).map((e) => (
            <>

                <div className="container mt-4">
                    <div className="flex justify-center my-2">
                        <div className="w-4/5 max-w-md shadow-2xl py-2 my-2">
                            <div className="bg-white rounded-lg shadow-md py-4 pt-1 px-4">
                                <div className="flex justify-between">
                                    <h1 className="text-xl font-bold mb-2">Invoice</h1>
                                    <p className="text-gray-500">MarkDigital.com</p>
                                </div>
                                <hr className=' m-auto my-2' />
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <p className="font-semibold">Billed:</p>
                                        <p>{user.name}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Date:</p>
                                        <p>{formattedDate}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Order ID:</p>
                                        <p>#{randomSixDigitNumber}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {/* <h4 className="text-green-600 mb-1">MarkDigital</h4> */}

                                </div>
                                <hr className=' m-auto my-3' />
                                <div className="mt-3">
                                    <div className="overflow-x-auto">
                                        <table className="table-auto w-full m-auto">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2">Product</th>
                                                    <th className="px-4 py-2">Price</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td className=" border font-bold py-2">MarkX {e.name}</td>
                                                    <td className="border px-1 py-2">{e.price}</td>

                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-2"></td>
                                                    <td className="px-4 py-2"></td>
                                                    <td className=" px-4 py-2 font-semibold">Total :</td>
                                                    <td className="border font-bold px-2 py-2">{e.price}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="text-right mt-4">
                                    <input type="submit" to="/pSuccess" onClick={ChangeStatus} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">

                                    </input>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ))

    );
}
