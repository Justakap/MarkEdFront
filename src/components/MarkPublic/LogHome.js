import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LogHome() {

  // eslint-disable-next-line
  const [name, setName] = useState('test@gmail');

  const [users, setUsers] = useState([]);

  // useEffect(() => {
  // axios.get("http://localhost:5003/home")
  //   .then(res => {
  //     if (res.data.valid) {
  //     } else {
  //       navigate('/login');
  //     }
  //   })
  //   .catch(err => console.log(err));

  // Fetch user data
  //   
  // }, []); // Empty dependency array means this effect runs once after the initial render

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`)
      .then(response => setUsers(response.data))
      .catch(err => console.log(err));
  })

  // for the rexommended course


  const [branches, setBranches] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
      .then(response => setBranches(response.data))
      .catch(err => console.log(err));
  }, []); // Empty dependency array for fetching data once when the component mounts


  return (
    <>
      {users
        // eslint-disable-next-line
        .filter((user) => user.email == name)
        .map(element => (
          <>


            <div className="flex flex-wrap mt-5  row sm:mb-11">
              <div className=" animatekarle wrapper col-lg-6">
                <p className="text-5xl font-bold py-12 pl-16 pt-24">Hi {element.name}<br /> Start Learning Today <br /> From Variety of Courses
                  <br />
                </p>
                <div className="ml-14">
                  <Link to="/resources" className="  relative px-5 py-3 overflow-hidden font-medium text-black bg-blue-100 border border-blue-100 rounded-lg shadow-inner group">
                    <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-indigo-600 group-hover:w-full ease"></span>
                    <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-indigo-600 group-hover:w-full ease"></span>
                    <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200  bg-indigo-500 group-hover:h-full ease"></span>
                    <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200  bg-indigo-500 group-hover:h-full ease"></span>
                    <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-blue-900 opacity-0 group-hover:opacity-100"></span>
                    <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Get Started</span>
                  </Link>
                </div>
              </div>
              <div className="right col-lg-6 col-md-12 col-sm-12 my-5">
                <div key={element.id} className="text-3xl text-center font-extrabold m-1">
                  Recommended Course
                </div>

                <div className=" flex flex-wrap">
                  {branches.filter((flitered) => (flitered.branch === element.branch)).map((branch) => (
                    <div key={branch.id} className=" w-96 rounded overflow-hidden shadow-lg m-auto">
                      <img
                        className="w-full h-56"
                        src={branch.image}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-3 py-2">
                        <div className="font-bold text-2xl mb-4 text-center">
                          {branch.branch}
                        </div>
                        <div className="text-center  my-1 mb-4">
                          <Link to={`/semester?branch=${branch.branch}`} className="  text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            Explore →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </>
        ))}
    </>
  );
}
