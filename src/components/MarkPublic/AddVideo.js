import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddVideo() {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState([]);
  const [unit, setUnit] = useState([]);
  const [semesterCount, setSemesterCount] = useState([]);
  const [formData, setFormData] = useState({
    branch: '',
    semester: '',
    subject: '',
    unit: '',
    source: '',
    notesUrl: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => { 
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
      .then(response => setData(response.data))
      .catch(err => console.log(err));
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`)
      .then(response => setSubject(response.data))
      .catch(err => console.log(err));
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/unit`)
      .then(response => setUnit(response.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (formData.branch === "First Year") {
      setSemesterCount([1]);
    } else {
      setSemesterCount([3, 4, 5, 6, 7, 8]);
    }
    setFormData(prevState => ({ ...prevState, semester: '' }));
  }, [formData.branch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/Modify/Video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          setFormData({
            branch: '',
            semester: '',
            subject: '',
            unit: '',
            source: '',
            notesUrl: '',
          });
          setSuccessMessage('Video added successfully!');
        } else {
          throw new Error('Failed to add video');
        }
      })
      .catch(error => console.error('Error adding video:', error));
  };

  const sortedUnits = unit.sort((a, b) => a.unit[0].number - b.unit[0].number);

  return (
    <div className="">
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <div className="container">
        <h1 className=" text-center text-3xl font-bold my-3">Modify Videos</h1>
        <hr className='my-4 w-4/5 m-auto' />
        <form onSubmit={handleSubmit} action='/addvideo'>
          <div className="mb-3">
            <div className='flex flex-wrap justify-center'>
              <div className="text-center max-w-sm w-72 p-6 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Enter Details</h5>
                <hr />
                <select className='my-2 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' required name="branch" onChange={handleInputChange} value={formData.branch}>
                  <option value="">Select Branch</option>
                  {data.map((data, index) => (
                    <option key={index} value={data.branch}>{data.branch}</option>
                  ))}
                </select>
                <select className='my-2 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' required name="semester" onChange={handleInputChange} value={formData.semester}>
                  <option value="">Select semester</option>
                  {semesterCount.map((semester, index) => (
                    <option key={index} value={semester}>{semester}</option>
                  ))}
                </select>
                <select className='my-2 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' required name="subject" onChange={handleInputChange} value={formData.subject}>
                  <option value="">Select Subject</option>
                  {subject
                    .filter((filter) => filter.branch === formData.branch && filter.semester === parseInt(formData.semester, 10))
                    .map((element, index) => (
                      <option key={index} value={element.name}>
                        {element.name}
                      </option>
                    ))}
                </select>
                <select className='my-2 block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-r-0 border-l-0 border-t-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' required name="unit" onChange={handleInputChange} value={formData.unit}>
                  <option value="">Select Unit</option>
                  {sortedUnits
                    .filter((filter) => filter.subject === formData.subject)
                    .map((element, index) => (
                      <option key={index} value={element.unit[0].number}>
                        {element.unit[0].number}
                      </option>
                    ))}
                </select>
                <br />
                <Link to={`/Modify/Video/Add?Subject=${formData.subject}&Unit=${formData.unit}&Semester=${formData.semester}&Branch=${formData.branch}`} className="mt-8 focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-800">Next</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
