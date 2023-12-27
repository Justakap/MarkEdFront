import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
     <marquee direction="left" behavior="alternate" className="bg-yellow-100 " >
              <div className="flex">
                <img className='mx-3 my-2 h-3' src="https://rtu.ac.in/index/Adminpanel/Images/newicon1.gif" alt="" />
                <button className='  font-serif'>Click Here for <Link target='_blank' to={"https://justakap.github.io/cgpa/"}>CGPA Predictor</Link>
                </button>
                 </div>
                </marquee>
      <div   class="text-5xl text-center font-extrabold my-8">MarkX Education</div>
      {/* <hr  className='w-3/5 m-auto border-dotted text-3xl h-1 my-8 bg-teal-800 border-0 rounded' /> */}
      <div style={{ height: "67vh"}} class="flex mt-5 flex-wrap">
        <div class=" w-1/2   animatekarle wrapper">
          <p class="text-5xl font-bold py-12 pl-16">Engineering Simplified <br /> Your Way <br />Learn It Feel It
            <br />
          </p>
          <div className="ml-14">
          <Link to="/register" class="relative px-5 py-3 overflow-hidden font-medium text-black bg-blue-100 border border-gray-100 rounded-lg shadow-inner group">
            <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-blue-900 opacity-0 group-hover:opacity-100"></span>
            <span class=" text-xl relative transition-colors duration-300 delay-200 group-hover:text-white ease">Get Started</span>
          </Link>
          </div>
        </div>
        <div class="right w-1/2 h-3/4 ">
          <img className=' m-auto h-80 rounded-3xl' src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=740&t=st=1703238997~exp=1703239597~hmac=319b3a31cba3cccbe120b9814b36baea1129c0ddf11329644f3ba1ed81627cc3" alt="" />
        </div>
      </div>

      <div class="d-flex flex-column justify-content-center w-100 h-100">

        <div class="d-flex flex-column justify-content-center align-items-center">

        </div>
      </div>

    </>
  );
}
//<span className='typing-demo text-4xl pt-8'>Get Notes ,Video Lectures , PYQ <br />and Many more</span>
