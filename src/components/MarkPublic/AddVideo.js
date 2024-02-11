import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AddVideo() {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState([]);
  const [formData, setFormData] = useState({
    branch: '',
    semester: '',
    subject: '',
    count: '',
    source: '',
    notesUrl: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
      .then(response => setData(response.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/subjects`)
      .then(response => setSubject(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBranchChange = (e) => {
    const selectedBranch = e.target.value;
    setFormData({ ...formData, branch: selectedBranch, semester: '' }); // Reset semester when changing branch
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/addResource/addVideo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),


    })
    setFormData({
      branch: '',
      semester: '',
      subject: '',
      count: '',
      source: '',
      notesUrl: '',
      pyq: '',
    });
    setSuccessMessage('Subject added successfully!');


  };

  return (

    <div className=''>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <div className="container ">
        <h1 className="text-3xl font-bold my-3">Add a Video</h1>
        <form onSubmit={handleSubmit} action='/addvideo'>
          <div className="mb-3">
            <label className="form-label my-3">Branch</label>
            <select
              name="branch"
              className="form-select rounded"
              id="branch1"
              onChange={handleBranchChange}
              value={formData.branch}
            >
              <option value="">Select Branch</option>
              {data.map((element) => (
                <option key={element.branch} value={element.branch}>
                  {element.branch}
                </option>
              ))}
            </select>

            <div className="mb-3">
              <label className="form-label" htmlFor="semester">Semester</label>
              <select
                name="semester"
                className="form-select rounded"
                id="semester"
                onChange={handleInputChange}
                value={formData.semester}
              >
                <option value="">Select Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="subject">Subject</label>
              <select
                name="subject"
                className="form-select rounded"
                id="subject"
                onChange={handleInputChange}
                value={formData.subject}
              >
                <option value="">Select Subject</option>
                {subject
                  .filter((filter) => filter.branch === formData.branch && filter.semester === parseInt(formData.semester, 10))
                  .map((element) => (
                    <option key={element.name} value={element.name}>
                      {element.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="count">Video Number</label>
              <input
                className="form-control rounded"
                type="text"
                name="count"
                onChange={handleInputChange}
                value={formData.count}
              />
            </div>

            <div className="mb-3">
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
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="notesUrl">Pyq Url</label>
              <input
                className="form-control rounded"
                type="text"
                name="pyq"
                onChange={handleInputChange}
                value={formData.pyq}
              />
            </div>

            <input className="btn btn-outline-primary" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
