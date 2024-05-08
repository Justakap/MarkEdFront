import React from 'react';
import { Link } from 'react-router-dom';

export default function AssessmentHome() {
  return (
    <form onSubmit> 
      <div className='flex ml-6 flex-wrap justify-center'>
        <div className="text-center max-w-sm w-72 p-6 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Assessment Home</h5>
          <hr />
          <Link 
            to="/LogAssessment/AttemptAssessment" 
            className="my-8 w-48 focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 inline-block"
          >
            Attempt
          </Link>
          <Link 
            to="/LogAssessment/viewResult" 
            className="mt-3 my-16 w-48 focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 inline-block"
          >
            View Results
          </Link>
        </div>
      </div>
    </form>
  );
}
