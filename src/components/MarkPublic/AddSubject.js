import React, { useState } from 'react';

export default function AddSubject() {
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

    fetch(`${process.env.REACT_APP_API_BASE_URL}/addResource/addSubject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    setFormData({
      name: '',
      semester: '',
      image: '',
      branch: '',
    });
    setSuccessMessage('Subject added successfully!');

  };

  return (
    <>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <div className="text-3xl font-bold m-3">Add Subject</div>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>Enter Name</td>
            <td>
              <input type="text" name='name' onChange={handleInputChange} value={formData.name} />
            </td>
          </tr>
          <tr>
            <td>Enter semester</td>
            <td>
              <input type="text" name='semester' onChange={handleInputChange} value={formData.semester} />
            </td>
          </tr>
          <tr>
            <td>Enter image</td>
            <td>
              <input type="text" name='image' onChange={handleInputChange} value={formData.image} />
            </td>
          </tr>
          <tr>
            <td>Enter Branch</td>
            <td>
              <input type="text" name='branch' onChange={handleInputChange} value={formData.branch} />
            </td>
          </tr>
          <tr>
            <td>
              <input type="submit" className='btn btn-outline-primary' value="Submit" />
            </td>
          </tr>
        </table>
      </form>
    </>
  );
}
