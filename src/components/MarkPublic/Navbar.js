import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import markLogo from '../../mark.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleButtonClick = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
    };

    const btn = document.querySelector(".mobile-menu-button");
    const menu = document.querySelector(".mobile-menu");

    btn.addEventListener("click", handleButtonClick);

    // Close the mobile menu when clicking outside of it
    document.addEventListener("click", closeMobileMenu);

    // Prevent closing the mobile menu when clicking inside it
    menu.addEventListener("click", (e) => e.stopPropagation());

    return () => {
      btn.removeEventListener("click", handleButtonClick);
      document.removeEventListener("click", closeMobileMenu);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav style={{color:"white", backgroundColor: "#D2E0FB", fontFamily: "'Rubik', sans-serif" }} className="bg-gray-200 shadow-md p-4 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="flex items-center text-lg font-bold text-gray-700 hover:text-gray-900">
              <img
                className="w-28 h-8"
                src={markLogo}
                alt="Better Dev Logo"
              />
            </Link>
          </div>

          {/* Primary Navigation (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-10  text-xl font-bold">
            <Link to="/home" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </Link>
            <Link to="/Resources" className="text-gray-700 hover:text-gray-900">
              Resources
            </Link>
            <Link to="/Assesment" className="text-gray-700 hover:text-gray-900">
              Assesment
            </Link>
            <Link to="/addResource" className="text-gray-700 hover:text-gray-900">
              Add Resources
            </Link>
            <Link to="/About" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
          </div>

          {/* Secondary Navigation (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-5 font-bold">
            <Link to="/profile" className="bg-blue-400 hover:bg-blue-300 text-white rounded px-3 py-1 transition duration-300">Profile</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button p-2 text-gray-700 hover:text-gray-900 focus:outline-none">
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
      <div className={`mobile-menu md:hidden ${isMobileMenuOpen ? "" : "hidden"}`}>
        <Link to="/Dashboard" className="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-200">
          Dashboard
        </Link>
        <Link to="/Resources" className="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-200">
          Resources
        </Link>
        <Link to="/About" className="block py-2 px-4 text-lg text-gray-700 hover:bg-gray-200">
          About
        </Link>
      </div>
    </nav>
  );
}
