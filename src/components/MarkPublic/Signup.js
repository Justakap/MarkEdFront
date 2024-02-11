import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [branch, setBranch] = useState('');
    const [year, setYear] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/branches`)
            .then(response => setData(response.data))
            .catch(err => console.log(err));
    }, []);



    const history = useNavigate();

    async function submit(e) {
        e.preventDefault()

        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
                name, email, password, contact, year,branch
            })
                .then(res => {
                    // eslint-disable-next-line
                    if (res.data == "exist") {
                        alert("Already Exist")
                    }
                    // eslint-disable-next-line
                    else if (res.data == "notexist") {
                        alert("User Registered")
                        history("/login", { state: { id: email } })
                    }
                }).catch(e => {
                    alert("Invalid Details")
                    console.log(e)
                })
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>

            <>
                <section className="bg-slate-200 pb-12 pt-4">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-lg-8 col-xl-11">
                                <div className="card text-black rounded-md">
                                    <div className="card-body p-md-5">
                                        <div className="row justify-content-center">
                                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                                <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-2">Sign up</p>

                                                <form className="mx-1 mx-md-4">
                                                    <div>
                                                        <div className="d-flex flex-row align-items-center mb-1">
                                                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">

                                                                <input className="form-control rounded-xl" type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Enter Your Name" name="name" id="" />
                                                                <label className="form-label" htmlFor="form3Example1c">
                                                                    Your Name
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex flex-row align-items-center mb-1">
                                                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <input className="rounded-xl form-control" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Your Email" name="" id="" />

                                                                <label className="form-label" htmlFor="form3Example3c">
                                                                    Your Email
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex flex-row align-items-center mb-1">
                                                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">

                                                                <input className="rounded-xl form-control" type="number" onChange={(e) => { setContact(e.target.value) }} placeholder="Enter Your Number" name="" id="contactNumber" />
                                                                <label className="form-label" htmlFor="contact">
                                                                    Your Contact
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="d-flex flex-row align-items-center mb-1">
                                                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">

                                                                <input type="password" className="rounded-xl form-control" onChange={(e) => { setPassword(e.target.value) }} placeholder="Set Your Pass" name="" id="" />
                                                                <label className="form-label" htmlFor="form3Example4c">
                                                                    Password
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-1">
                                                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <select onChange={(e) => { setBranch(e.target.value) }} className="rounded-xl form-control mb-4">
                                                                    <option value="">Select Branch</option>
                                                                    {data.map((element) => (
                                                                        <option key={element.branch} value={element.branch}>
                                                                            {element.branch}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center mb-1">
                                                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                            <div className="form-outline flex-fill mb-0">
                                                                <select onChange={(e) => { setYear(e.target.value) }} className="rounded-xl form-control mb-4">
                                                                    <option value="">Select Year</option>
                                                                    {Array.from({ length: 4 }).map((_, index) => (
                                                                        <option key={index+1} value={index+1}>
                                                                            {index+1}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">

                                                        <input type="submit" value="Create Account" onClick={submit} className="btn btn-outline-primary btn-lg" />
                                                    </div>
                                                </form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </>
    )
}
