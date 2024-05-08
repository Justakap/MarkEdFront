import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const token = localStorage.getItem('token');
    const _id = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (token) {
            // const { email } = JSON.parse(localStorage.getItem('user'));
            if (_id) { // Check if email is not empty
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/userNew?_id=${_id}`)
                    .then(response => {
                        setUser(response.data);
                    })
                    .catch(err => console.log(err));
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, []);


    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav style={{ color: "white", backgroundColor: "#596FB7", fontFamily: "'Rubik', sans-serif" }} className="bg-gray-200 shadow-md p-4 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between jus items-center">
                    {/* Logo */}

                    <div className="flex-shrink-0">
                        <Link to="/home" className="flex items-center text-lg font-bold text-white hover:text-gray-900">
                            {/* <img
                                className="w-28 h-8"
                                src={markLogo}
                                alt="Better Dev Logo"
                            /> */}
                            <span className=' text-2xl'>MarkX  </span> <span className=' text-5xl font-extrabold'>⁺</span>

                        </Link>
                    </div>
                    {/* Primary Navigation (hidden on mobile) */}
                    <div className="hidden font-extralight md:flex items-center space-x-8 text-xl ">
                        <Link to="/LogAssessment" className="text-white hover:text-gray-900">
                            Assesment
                        </Link>
                        <Link to="/LogResources" className="text-white hover:text-gray-900">
                            Resources
                        </Link>

                        {user.isPlus  ? <></>:<><Link to="/Logpricing" className="text-white hover:text-gray-900">
                            Upgrade
                        </Link></>}
                       



                    </div>
                    <div className="hidden md:flex font-bold justify-end">
                        {/* <Link to="/profile" className=" font-medium text-md bg-white shadow-lg hover:bg-blue-300 text-blue-700 rounded px-3 py-1 transition duration-300">Profile</Link> */}
                        <Link to="/profile"> <img className=' w-12 h-12 rounded-full border-black border-2' src={user ? user.image : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"} alt="" /></Link>
                    </div>


                    {/* Secondary Navigation (hidden on mobile) */}
                    {/* <div className="hidden md:flex items-center space-x-5 font-bold">
            <Link to="/profile" className="bg-white shadow-lg hover:bg-blue-300 text-blue-400 rounded px-3 py-1 transition duration-300">Profile</Link>
          </div> */}

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button id="toggleButton" onClick={toggleMobileMenu} className="mobile-menu-button p-2 text-white hover:text-gray-900 focus:outline-none">
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (visible on mobile) */}
            <div id="mobile" className={`mobile-menu md:hidden ${isMobileMenuOpen ? "" : "hidden"}`}>
                <Link to="/Profile" className="block py-2 px-4 text-lg text-white hover:bg-gray-200" onClick={toggleMobileMenu}>
                    Profile
                </Link>
                <Link to="/LogAssessment" className="block py-2 px-4 text-lg text-white hover:bg-gray-200" onClick={toggleMobileMenu}>
                    Assesment
                </Link>
                <Link to="/LogResources" className="block py-2 px-4 text-lg text-white hover:bg-gray-200" onClick={toggleMobileMenu}>
                    Resources
                </Link>
                <Link to="/LogPricing" className="block py-2 px-4 text-lg text-white hover:bg-gray-200" onClick={toggleMobileMenu}>
                    Upgrade
                </Link>


            </div>
        </nav>
    );
}
