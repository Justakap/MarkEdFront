import React from 'react';
import { Link } from 'react-router-dom';
import cover from '../../images/Blue Orange 3D Class Project Education Website/home1.png';

export default function Home() {
  return (
    // <>
    //   {/* <marquee direction="left" behavior="alternate" className="bg-yellow-100 " >
    //     <div className="flex">
    //       <img className='mx-3 my-1 h-3' src="https://rtu.ac.in/index/Adminpanel/Images/newicon1.gif" alt="" />
    //       <button className='  font-serif'>Click Here for <Link target='_blank' to={"https://justakap.github.io/cgpa/"}>CGPA Predictor</Link>
    //       </button>
    //     </div>
    //   </marquee> */}

    //   {/* <hr  className='w-3/5 m-auto border-dotted text-3xl h-1 my-8 bg-teal-800 border-0 rounded' /> */}
    //   <div className="flex mt-16 flex-wrap-reverse mb-48 sm:mb-24 justify-center items-center">
    //     <div className="animatekarle wrapper col-lg-8 text-center sm:text-left">
    //       <p className="text-3xl font-bold mb-8 sm:text-5xl sm:font-bold">
    //         Start Learning Today <br /> From a Variety of Courses
    //       </p>
    //       <div className="">
    //         <Link to={"/resources"} className="m-auto relative px-5 py-3 overflow-hidden font-medium text-white bg-cyan-600 border border-blue-400 rounded-lg shadow-inner group">
    //           <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-indigo-600 group-hover:w-full ease"></span>
    //           <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-indigo-600 group-hover:w-full ease"></span>
    //           <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200  bg-indigo-500 group-hover:h-full ease"></span>
    //           <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200  bg-indigo-500 group-hover:h-full ease"></span>
    //           <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-blue-900 opacity-0 group-hover:opacity-100"></span>
    //           <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">Get Started</span>
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="right col-lg-6 col-md-12 col-sm-12 my-1 rounded overflow-hidden m-auto">
    //       <img style={{ mixBlendMode: "multiply" }} className='m-auto h-40 sm:h-60 rounded-xl' src={cover} alt="" />
    //     </div>
    //   </div>
    // </>
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
