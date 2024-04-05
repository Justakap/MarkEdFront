import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';

export default function Profile() {
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [user, setUser] = useState([]);



    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    const currentUser = JSON.parse(localStorage.getItem('user'));
                    // console.log(currentUser);
                    setUser(currentUser);
                    setName(user.email);

                })
                .catch(err => {
                    console.error('Error fetching user data:', err);
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [navigate]);



    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`)
            .then(response => {
                // setUsers(response.data);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch(err => {
                console.log(err);
                setLoading(false); // Set loading to false in case of an error
            });
    }, []); // Empty dependency array means this effect runs once after the initial render



    const Logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }
    return (
        <>
            {loading ? (
                <div className="flex justify-center h-screen">
                    <Loading />
                </div>
            ) : (
                <section className="vh-80 font-serif text-lg" style={{ backgroundColor: "#f4f5f7", fontFamily: "'Rubik', sans-serif" }}>

                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-lg-6 mb-4 mb-lg-0">
                                <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                                    <div className="row g-0">
                                        <div
                                            className="col-md-4 bg-gradient-to-b from-cyan-500 to-blue-500  text-center text-white"
                                            style={{
                                                borderTopLeftRadius: ".5rem",
                                                borderBottomLeftRadius: ".5rem"
                                            }}
                                        >
                                            <img
                                                src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"

                                                alt="Avatar"
                                                className="img-fluid m-auto py-8 rounded-xl"
                                                style={{ width: 80, borderRadius: "100%", backgroundColor: "transparent" }}
                                            />
                                            <h5>{user.name}</h5>
                                            <p>{user.contact}</p>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-4 ">
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
                                                        <p className="text-muted ml-2 ">{user.year}</p>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
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
                                                    <div className="">
                                                        <button onClick={Logout}>
                                                            Logout
                                                        </button>
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
            )}
        </>
    );
}


