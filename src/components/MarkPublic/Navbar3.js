import React from 'react';
import { Link } from 'react-router-dom';
import cover from '../../MarkX.png';


export default function Navbar() {
  return (
    <nav style={{ color: "white", backgroundColor: "#596FB7", fontFamily: "'Rubik', sans-serif" }} className="bg-gray-200 shadow-md p-4 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center">
          {/* Logo */}
          

          {/* Primary Navigation (hidden on mobile) */}
         
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center text-lg font-bold text-white hover:text-gray-900">
              <img
                className="w-28 h-8"
                src={cover}
                alt="Better Dev Logo"
              />
          
            </Link>
          </div>

          {/* Secondary Navigation (hidden on mobile) */}
          {/* <div className="hidden md:flex items-center space-x-5 font-bold">
            <Link to="/profile" className="bg-white shadow-lg hover:bg-blue-300 text-blue-400 rounded px-3 py-1 transition duration-300">Profile</Link>
          </div> */}

          {/* Mobile Menu Button */}
          
        </div>
      </div>

    </nav>
  );
}
