import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import markLogo from '../../MarkX.png';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav style={{ color: "white", backgroundColor: "#596FB7", fontFamily: "'Rubik', sans-serif" }} className="bg-gray-200 shadow-md p-4 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center">
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
                        <Link to="/LogAssesment" className="text-white hover:text-gray-900">
                            Assesment
                        </Link>
                        <Link to="/LogResources" className="text-white hover:text-gray-900">
                            Resources
                        </Link>
                        <Link to="/pricing" className="text-white hover:text-gray-900">
                        Payment
                        </Link>


                    </div>
                    <div className="hidden md:flex items-center space-x-5 font-bold">
                        <Link to="/profile" className=" font-medium text-md bg-white shadow-lg hover:bg-blue-300 text-blue-700 rounded px-3 py-1 transition duration-300">Profile</Link>
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
                <Link to="/LogAssesment" className="block py-2 px-4 text-lg text-white hover:bg-gray-200" onClick={toggleMobileMenu}>
                    Assesment
                </Link>
                <Link to="/LogResources" className="block py-2 px-4 text-lg text-white hover:bg-gray-200" onClick={toggleMobileMenu}>
                    Resources
                </Link>


            </div>
        </nav>
    );
}
