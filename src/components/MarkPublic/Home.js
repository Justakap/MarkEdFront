import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cover from '../../images/Blue Orange 3D Class Project Education Website/home1.png';

export default function Home() {
const [data, setData]= useState([])
  useEffect(() => {
    axios.get(`https://flask-first.onrender.com/data`)
        .then(response => setData(response.data))
        .catch(err => console.log(err))
}, []);
console.log(data)
  return (
 
    <>
      <div className='bg-white flex flex-col justify-between items-center my-14 md:flex-row md:flex-wrap-reverse mb-20'>
        <div className='animatekarle text-center col-lg-6 col-md-12 col-sm-12'>
          <p className='text-5xl py-12 md:pl-16 m-auto pt-8' style={{ fontFamily: 'Poppins' }}>
            MarkX Education
          </p>
          <p className='text-xl text-black py-4 px-8 pt-4' style={{ fontFamily: 'Poppins' }}>
            Our website offers a wealth of resources, including interactive courses, informative articles, educational videos, and much more, designed to inspire curiosity, spark creativity, and foster lifelong learning.
          </p>
          <Link to="/resources" class="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 hover:text-slate-100">
            <span>Get Started </span>
            <svg class="w-4 h-4 ml-3 fill-current" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
          </Link>
        </div>
        <div className='col-lg-6 col-md-12 col-sm-12 text-center mt-10'>
          <img src={cover} alt="" className='h-48 md:h-96' style={{ margin: 'auto' }} />
        </div>
      </div>
    </>

  );
}
