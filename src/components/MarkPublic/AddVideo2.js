import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function AddVideo2() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subject = queryParams.get('Subject');
  const unit = queryParams.get('Unit');
  const semester = queryParams.get('Semester');
  const branch = queryParams.get('Branch');

  const [successMessage, setSuccessMessage] = useState(null);

  const [formData, setFormData] = useState({
    subject: subject,
    unit: unit,
    semester: semester,
    branch: branch,
    source: '',
    notesUrl: '',
    comment: ''

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/Modify/Video/Add`, {
        subject: formData.subject,
        branch: formData.branch,
        semester: formData.semester,
        unit: formData.unit,
        source: formData.source,
        notesUrl: formData.notesUrl,
        comment: formData.comment

      });

      if (response.data === "added") {
        setSuccessMessage("Video added successfully!");
        window.location.reload();
      } else if (response.data === "exist") {
        alert("Video already exists 1.");
      } else if (response.data === "nadded") {
        alert("Video not added.");
      }
    } catch (error) {
      console.error("Server Error:", error);
      alert("Server Error");
    }
  };


  return (
    <>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <h1 className=' text-center text-3xl my-3'>Showing {subject}</h1>
      <h1 className=' text-center text-3xl my-3'> Unit - {unit} </h1>
      <hr className=' w-4/5 m-auto my-3' />
      <div className='flex ml-6 justify-center flex-wrap mb-8'>
        <div className="text-center max-w-sm w-72 p-4 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add Video</h5>
          <hr />
          <form onSubmit={handleSubmit}>
            <input onChange={handleInputChange} value={formData.source} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-1 mt-3' type="text" placeholder='Enter Video URL' name="source" required />
            <input onChange={handleInputChange} value={formData.notesUrl} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-2' type="text" placeholder='Enter Notes URL' name="notesUrl" />
            <input onChange={handleInputChange} value={formData.comment} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-2' type="text" placeholder='Enter Comments (if Req)' name="comment" />
            <button type="submit" className="mt-3 focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-800">Add Video</button>
          </form>
        </div>
      </div>


      {/* <div className="mb-3">
              <label className="form-label" htmlFor="source">Video Url</label>
              <input
                className="form-control rounded"
                type="text"
                name="source"
                onChange={handleInputChange}
                value={formData.source}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="notesUrl">Notes Url</label>
              <input
                className="form-control rounded"
                type="text"
                name="notesUrl"
                onChange={handleInputChange}
                value={formData.notesUrl}
              />
            </div> */}

    </>
  )
}
