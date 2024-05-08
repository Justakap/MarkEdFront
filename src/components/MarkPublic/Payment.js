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
    const generateRandomSixDigitNumber = () => {
        const min = 100000; // Minimum value (inclusive)
        const max = 999999; // Maximum value (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [promoCode, setPromoCode] = useState('');
    const [randomSixDigitNumber, setRandomSixDigitNumber] = useState(generateRandomSixDigitNumber); // Generate random number once

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
                    
                    const _id = JSON.parse(localStorage.getItem('user'));
                    axios.get(`${process.env.REACT_APP_API_BASE_URL}/userNew?_id=${_id}`)
                        .then(response => {
                            setUser(response.data);

                        })
                        .catch(err => console.log(err));
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
        const _id = JSON.parse(localStorage.getItem('user'))
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/userNew?_id=${_id}`)
            .then(response => {
                setUsers(response.data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []); // Empty dependency array means this effect runs once after the initial render



    const ChangeStatus = async (e) => {
        e.preventDefault();
        if (promoCode === "0011") {
            try {

                const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/updateStatus/${user._id}`);

                if (response.data === "updated") {
                    navigate(`/pSuccess?id=${user._id}`)
                } else if (response.data === "exist") {
                    alert("Unit already exists.");
                } else if (response.data === "nadded") {
                    alert("Unit not added.");
                }
            } catch (error) {
                console.error("Server Error:", error);
                alert("Server Error");
            }
        }
        else {
            alert("Payment Failed")
        }

    };

    return (
        courses.filter((e) => e.id === id).map((e) => (
            <>
                <div class="bg-white rounded-lg shadow-lg px-8 my-2 py-10 max-w-xl mx-auto">
                    <div class="flex items-center justify-between mb-1">
                        <div class="flex items-center">
                            {/* MarkX */}
                            <div class="text-gray-700 font-semibold text-3xl">Mark</div>
                        </div>
                        <div class="text-gray-700">
                            <div class="font-bold text-xl mb-2">INVOICE</div>
                            <div class="text-sm">Date: {formattedDate}</div>
                            <div class="text-sm">Invoice # {randomSixDigitNumber}</div>
                        </div>
                    </div>
                    <div class="border-b-2 border-gray-300 pb-1 mb-3">
                        <h2 class="text-2xl font-bold mb-2">Bill To : {user.name}</h2>
                        <div class="text-gray-700 mb-2">{user.contact}</div>

                    </div>
                    <table class="w-full text-left mb-2">
                        <thead>
                            <tr>
                                <th class="text-gray-700 font-bold uppercase py-2">Description</th>
                                <th class="text-gray-700 font-bold uppercase py-2">Duration</th>
                                <th class="text-gray-700 font-bold uppercase py-2">Price</th>
                                <th class="text-gray-700 font-bold uppercase py-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="py-4 text-gray-700">Mark {e.name}</td>
                                <td class="py-4 text-gray-700">1 Month</td>
                                <td class="py-4 text-gray-700">₹{e.price}</td>
                                <td class="py-4 text-gray-700">₹{e.price}</td>
                            </tr>

                        </tbody>
                    </table>
                    <div className="flex justify-between">


                        <div className="mt-2">

                            <input
                                type="text"
                                id="promoCode"
                                name="promoCode"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Enter Activation Key"
                            />
                        </div>

                        <div class="text-right mb-2">
                            <div class="text-gray-700 mr-2">Tax:</div>
                            <div class="text-gray-700">₹{e.price * 18 / 100}</div>
                            <div class="text-red-700 text-sm">18% GST</div>

                        </div>
                    </div>
                    <div class="flex justify-end mb-2">
                        <div class="text-gray-700 font-bold text-xl mr-2">Total:</div>
                        <div class="text-gray-700 font-bold text-xl">₹{e.price * 18 / 100 + e.price}</div>
                    </div>
                    <div className=" text-center">
                        <button
                            className="m-auto text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                            onClick={ChangeStatus}
                        >
                            Pay Now
                        </button>
                    </div>


                </div>
            </>
        ))
    );
}

  //     <>
        //         <div className="container mt-4">
        //             <div className="flex justify-center my-2">
        //                 <div className="w-4/5 max-w-md shadow-2xl py-2 my-2">
        //                     <div className="bg-white rounded-lg shadow-md py-4 pt-1 px-4">
        //                         <div className="flex justify-between">
        //                             <h1 className="text-xl font-bold mb-2">Invoice</h1>
        //                             <p className="text-gray-500">MarkDigital.com</p>
        //                         </div>
        //                         <hr className="m-auto my-2" />
        //                         <div className="flex justify-between mb-4">
        //                             <div>
        //                                 <p className="font-semibold">Billed:</p>
        //                                 <p>{user.name}</p>
        //                             </div>
        //                             <div>
        //                                 <p className="font-semibold">Date:</p>
        //                                 <p>{formattedDate}</p>
        //                             </div>
        //                             <div>
        //                                 <p className="font-semibold">Order ID:</p>
        //                                 <p>#{randomSixDigitNumber}</p>
        //                             </div>
        //                         </div>
        //                         <div className="text-right">
        //                             {/* <h4 className="text-green-600 mb-1">MarkDigital</h4> */}
        //                         </div>
        //                         <hr className="m-auto my-3" />
        //                         <div className="mt-3">
        //                             <div className="overflow-x-auto">
        //                                 <table className="table-auto w-full m-auto">
        //                                     <tbody>
        //                                         <tr>
        //                                             <td>
        //                                                 <div className="flex justify-between w-96">
        //                                                     <div className="border border-gray-300 text-black sm:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
        //                                                         {"MarkX " + e.name}
        //                                                     </div>
        //                                                     <div className="ml-8 text-center w-fit border border-gray-300 text-black sm:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
        //                                                         {e.price}
        //                                                     </div>
        //                                                 </div>
        //                                             </td>
        //                                         </tr>
        //                                         <tr>
        //                                             <div className="flex justify-between">
        //                                                 <div className="mt-2">
        //                                                     <label
        //                                                         htmlFor="promoCode"
        //                                                         className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
        //                                                     >
        //                                                         Have a Promo Code ?
        //                                                     </label>
        //                                                     <input
        //                                                         type="text"
        //                                                         id="promoCode"
        //                                                         name="promoCode"
        //                                                         value={promoCode}
        //                                                         onChange={(e) => setPromoCode(e.target.value)}
        //                                                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        //                                                         placeholder="Enter Promo Code"
        //                                                     />
        //                                                 </div>
        //                                                 <div className="text-right pt-12 font-semibold">
        //                                                     Total : {e.price}
        //                                                 </div>
        //                                             </div>
        //                                         </tr>
        //                                     </tbody>
        //                                 </table>
        //                             </div>
        //                         </div>
        //                         <div className="text-center mt-4">
        //                             <button
        //                                 className="m-auto text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
        //                                 onClick={ChangeStatus}
        //                             >
        //                                 Submit
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </>
