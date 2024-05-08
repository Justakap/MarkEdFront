import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LogHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const token = localStorage.getItem('token');
  const _id = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (token) {
      // const { email } = JSON.parse(localStorage.getItem('user'));
      if (_id) { // Check if email is not empty
        // axios.get(`${process.env.REACT_APP_API_BASE_URL}/userNew?email=${email}`)
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


  const [branches, setBranches] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
      .then(response => setBranches(response.data))
      .catch(err => console.error('Error fetching branches:', err));
  }, []); // Empty dependency array for fetching data once when the component mounts

  if (!user) {
    // If user state is null, redirect to login page
    return null; // or you can render a loading indicator or any other component
  }

  return (
    <>
      <div className='bg-white flex flex-col justify-between items-center my-14 md:flex-row md:flex-wrap-reverse mb-20'>
        <div className='animatekarle text-center col-lg-6 col-md-12 col-sm-12'>
          <p className='text-5xl pt-8 m-auto' style={{ fontFamily: 'Poppins' }}>
            Welcome back, {user.name}!
          </p>
          <p className='text-xl text-black py-4 px-8 pt-4' style={{ fontFamily: 'Poppins' }}>
            Explore new features, discover exciting content, and make the most out of your journey with us. Have a fantastic time exploring!"
          </p>
          <Link to="/Logresources" class="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 hover:text-slate-100">
            <span>Get Started </span>
            <svg class="w-4 h-4 ml-3 fill-current" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
          </Link>
        </div>
        <div className='col-lg-6 col-md-12 col-sm-12 text-center mt-10'>
          <p className="text-xl text-center font-extrabold m-1">Recommended Course</p>

          {branches.filter((e) => e.branch === user.branch).map((branch) => (
            <div key={branch.id} className="w-80 rounded overflow-hidden shadow-lg m-auto">
              <img
                className="w-full h-40"
                src={branch.image}
                alt="Not Available"
              />
              <div className="px-3 py-2">
                <div className="font-bold text-2xl mb-4 text-center">
                  {branch.branch}
                </div>
                <div className="text-center my-1 mb-4">
                  <Link to={`/semester2?branch=${branch.branch}`} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
