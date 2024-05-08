import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export default function PaymentSuccess() {
  const [user, setUser] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`)
      .then(response => {
        // Filter the user data based on the ID from query parameters
        const filteredUser = response.data.filter((e) => e._id === id);
        setUser(filteredUser);
        // console.log(filteredUser[0])
        localStorage.setItem('user', JSON.stringify(filteredUser[0]));
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]); // Include id in the dependency array to fetch user data when it changes

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
          <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <Link to="/home" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
              GO TO HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
