import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddSubject() {

  const [semesterCount, setSemesterCount] = useState([]);
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    semester: '',
    image: '',
    branch: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/Modify/Subject/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    setFormData({
      name: '',
      semester: '',
      image: '',
      branch: '',
    });
    setSuccessMessage('Subject added successfully!');
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
      .then(response => setBranches(response.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (formData.branch === "First Year") {
      setSemesterCount([1]);
    } else {
      setSemesterCount([3, 4, 5, 6, 7, 8]);
    }
    // Reset semester when branch changes
    setFormData(prevState => ({
      ...prevState,
      semester: ''
    }));
  }, [formData.branch]);

  return (
    <>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <div className="text-center text-3xl font-bold m-3">Modify Subject</div>

      <table className=' m-auto mb-8'>
        <tr>
          <td>Select Branch</td>
          <td>
            <select name="branch" onChange={handleInputChange} value={formData.branch}>
              <option value="">Select Branch</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch.branch}>{branch.branch}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>Select semester</td>
          <td>
            <select name="semester" onChange={handleInputChange} value={formData.semester}>
              <option value="">Select semester</option>
              {semesterCount.map((semester, index) => (
                <option key={index} value={semester}>{semester}</option>
              ))}
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <Link to={`/Modify/Subject/Add?Branch=${formData.branch}&semester=${formData.semester}`} class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              Next
            </Link>
          </td>

        </tr>
        <tr><td></td></tr>
      </table>

    </>
  );
}
