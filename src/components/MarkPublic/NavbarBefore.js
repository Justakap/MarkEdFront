import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cover from '../../MarkX.png';

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
            <Link to="/" className="flex items-center text-lg font-bold text-gray-700 hover:text-gray-900">
              <img
                className="w-28 h-8"
                src={cover}
                alt="Better Dev Logo"
              />
            </Link>
          </div>

          {/* Primary Navigation (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-6 text-lg ">
            
            <Link
              to="/pricing"
              className="bg-blue-400 hover:bg-blue-300 text-white rounded px-3 py-1 transition duration-300"
            >
             MarkX Premium
            </Link>
          </div>



          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button id="toggleButton" onClick={toggleMobileMenu} className="mobile-menu-button p-2 text-white  focus:outline-none">
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
      <div id="mobile" className={`text-center mobile-menu md:hidden ${isMobileMenuOpen ? "" : "hidden"}`}>
        <Link to="/pricing" className="block py-2 px-4 text-lg text-white hover:bg-gray-200" onClick={toggleMobileMenu}>
          Mark Premium
        </Link>
       

      </div>
    </nav>
  );
}





