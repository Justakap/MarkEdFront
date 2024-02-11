import React, { useState } from 'react'

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

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/addResource/addBranch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    setSuccessMessage('Branch added successfully!');
    setFormData({
      branch: '',
      image: '',
    });


  };



  return (
    <>
  {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div className="text-3xl font-bold m-3">Add Branch</div>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td>Enter Name</td>
            <td>
              <input type="text" name='branch' onChange={handleInputChange} value={formData.branch} />
            </td>
          </tr>
          <tr>
            <td>Enter image</td>
            <td>
              <input type="text" name='image' onChange={handleInputChange} value={formData.image} />
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
  )
}
