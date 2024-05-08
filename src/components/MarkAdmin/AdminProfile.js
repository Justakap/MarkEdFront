import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function AdminProfile() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState([])
    const token = localStorage.getItem('token');
    const _id = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (token) {
            // const { email } = JSON.parse(localStorage.getItem('user'));
            if (_id) { // Check if email is not empty
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/userNew?_id=${_id}`)
                    .then(response => {
                        setAdmin(response.data);
                    })
                    .catch(err => console.log(err));
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, []);


    return (
        <>

            <div class="h-screen bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
                <div class="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3    bg-white  shadow-lg    transform   duration-200 easy-in-out">
                    <div class=" h-32 overflow-hidden" >
                        <img class="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                    </div>
                    <div class="flex justify-center px-5  -mt-12">
                        <img class="h-32 w-32 bg-white p-2 rounded-full   " src={admin && admin.image} alt="" />

                    </div>
                    <div class=" ">
                        <div class="text-center px-14">
                            <h2 class="text-gray-800 text-3xl font-bold">{admin.name}</h2>
                            <a class="text-gray-400 mt-2 hover:text-blue-500" href="https://www.instagram.com/anantk.05/" target="BLANK()">@anantk.05</a>
                            <p class="mt-2 text-gray-500 text-sm">It's important that we all take ownership of our goals and objectives. Let's strive toward success together!” “We're in the middle of an exciting time as our company grows.</p>
                        </div>
                        <hr class="mt-6" />
                        <div class="flex  bg-gray-50 ">
                            <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                <p><span class="font-semibold">Designation  : <br /></span>Founder MarkX</p>
                            </div>
                            <div class="border"></div>
                            <div class="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                <p> <span class="font-semibold">Admin Type : </span>Super Admin </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
