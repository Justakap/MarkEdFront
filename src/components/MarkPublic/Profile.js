import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
   
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/profile`)
            .then(res => {
                if (res.data.valid) {
                    setName(res.data.username);
                } else {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));

        // Fetch user data
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`)
            .then(response => setUsers(response.data))
            .catch(err => console.log(err));
    }, []); // Empty dependency array means this effect runs once after the initial render
    return (
        <>

            {users.filter((user) => user.email === name).map(element => (
                <>

                    <section className="vh-80 font-serif text-lg" style={{ backgroundColor: "#f4f5f7" ,  fontFamily: "'Rubik', sans-serif"}}>
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col col-lg-6 mb-4 mb-lg-0">
                                    <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                        <div className="row g-0">
                                            <div
                                                className="col-md-4 gradient-custom text-center text-white"
                                                style={{
                                                    borderTopLeftRadius: ".5rem",
                                                    borderBottomLeftRadius: ".5rem"
                                                }}
                                            >
                                                <img
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                    alt="Avatar"
                                                    className="img-fluid m-auto py-8"
                                                    style={{ width: 80 }}
                                                />
                                                <h5>{element.name}</h5>
                                                <p>{`itz_`+element.name.toLowerCase()}</p>
                                                {/* <i className="far fa-edit mb-5" /> */}
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body p-4 ">
                                                    <h6 className='font-extrabold'>Personal Details</h6>
                                                    <hr className="mt-0 mb-4" />
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>Email</h6>
                                                            <p className="text-muted">{element.email}</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>Phone</h6>
                                                            <p className="text-muted">{element.contact}</p>
                                                        </div>
                                                    </div>
                                                    <h6>Academics</h6>
                                                    <hr className="mt-0 mb-4" />
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6>Branch</h6>
                                                            <p className="text-muted">{element.branch}</p>
                                                        </div>
                                                        <div className="col-6 mb-3">
                                                            <h6>Year</h6>
                                                            <p className="text-muted">First</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-start">
                                                        <Link to="">
                                                            <i className="fab fa-facebook-f fa-lg me-3" />
                                                        </Link>
                                                        <Link to="">
                                                            <i className="fab fa-twitter fa-lg me-3" />
                                                        </Link>
                                                        <Link to="">
                                                            <i className="fab fa-instagram fa-lg" />
                                                        </Link>
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

            ))}


        </>
    )
}
