import React, { useState } from 'react'
import axios from 'axios';
export default function AddBranch() {
  const [formData, setFormData] = useState({
    branch: '',
    image: '',

  });
  const [successMessage, setSuccessMessage] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/Modify/Branch`, {
        branch: formData.branch,
        image: formData.image,
      });

      if (response.data === "added") {
        setSuccessMessage("Branch added successfully!");
        window.location.reload();
      } else if (response.data === "exist") {
        alert("Unit already exists.");
      } else if (response.data === "nadded") {
        alert("Unit not added.");
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

      <div className="text-3xl font-bold m-3 text-center">Modify Branches</div>
      <hr className=' w-4/5 m-auto my-3' />
      <form onSubmit={handleSubmit}>
        <div className='flex ml-6 flex-wrap justify-center'>
          <div className="text-center max-w-sm w-72 p-6 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Enter Details</h5>
            <hr />

            <input className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-1 mt-3' s placeholder='Enter Name' type="text" name='branch' onChange={handleInputChange} value={formData.branch} required />
            <input className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-1 mt-3' placeholder='Enter Image Link' type="text" name='image' onChange={handleInputChange} value={formData.image} required />
            <button type="submit" className="mt-3 focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-800">Add Unit</button>

          </div>
        </div>
      </form>



    </>
  )
}
