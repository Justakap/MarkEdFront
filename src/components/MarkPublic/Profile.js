import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';

export default function Profile() {
    const preset_key = process.env.REACT_APP_API_PRESET_KEY;
    const cloud_name = process.env.REACT_APP_API_CLOUD_NAME;
    const [image, setImage] = useState('');
    const [editing, setEditing] = useState(false); // State to manage edit form visibility

    function handleFile(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', preset_key);
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            .then(res => setImage(res.data.secure_url))
            .catch(err => console.log(err));
    }

    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const token = localStorage.getItem('token');
    const _id = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (token) {
            if (_id) {
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/userNew?_id=${_id}`)
                    .then(response => {
                        setUser(response.data);
                    })
                    .catch(err => console.log(err));
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, []);

    const updateImage = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/profileImage/${_id}`, {
                photo: image
            });
            if (response.data === "updated") {
                window.location.reload();
            } else {
                alert("Failed to update status.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            alert("Server Error");
        }
    };

    const Logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }

    return (
        <>

            <section className="vh-80 font-serif text-lg" style={{ backgroundColor: "#f4f5f7", fontFamily: "'Rubik', sans-serif" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-4 bg-gradient-to-b from-cyan-500 to-blue-500  text-center text-white" style={{ borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem" }}>
                                        <img onClick={() => setEditing(!editing)} src={user.image} alt="Avatar" className="img-fluid m-auto py-3 rounded-xl" style={{ width: 80, borderRadius: "100%", backgroundColor: "transparent" }} />
                                        
                                        {/* <button className='text-md font-thin text-blue-800 underline' >Edit</button> */}
                                        {editing && (
                                            <form name='edit' className=' text-center mb-5 flex mt-2 mx-2' onSubmit={updateImage}>
                                                <input onChange={handleFile} type="file" className='text-sm mx-2' />
                                                {image ? <button type="submit" className='bg-green-400 mb-6 text-sm rounded-md px-2 py-1'>Upload</button> : null}
                                            </form>
                                        )}
                                        <h5>{user.name}</h5>
                                        <p className='mb-16'>{user.contact}</p>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6 className='font-extrabold'>Personal Details</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">{user.email}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">{user.contact}</p>
                                                </div>
                                            </div>
                                            <h6>Academics</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Branch</h6>
                                                    <p className="text-muted">{user.branch}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6 className="">Year</h6>
                                                    <p className="text-muted ml-2">{user.year}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <div className="d-flex justify-content-start">
                                                    <Link to=""><i className="fab fa-facebook-f fa-lg me-3" /></Link>
                                                    <Link to=""><i className="fab fa-twitter fa-lg me-3" /></Link>
                                                    <Link to=""><i className="fab fa-instagram fa-lg" /></Link>
                                                </div>
                                                <div className="">
                                                    <button onClick={Logout}>Logout</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
