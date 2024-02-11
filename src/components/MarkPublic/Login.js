import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {
axios.defaults.withCredentials=true;
  const history = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function submit(e) {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        email, password
      })
        .then(res => {    
          if (res.data.login) {
            history("/home")
          }
          // eslint-disable-next-line
          else if (res.data == "incorrect") {
            alert("Password Do not Match")
          }
          // eslint-disable-next-line
          else if (res.data == "notexist") {
            alert("Please Sign In first")
          }

        }).catch(e => {
          alert("Server Error")
          console.log(e)
          console.error('Axios Error:', e);
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {/* <form action="" method="post"> */}




      <section className="bg-slate-200">
        <div className="container h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black rounded-md">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                      <form className="mx-1 mx-md-4" method='post' >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">

                            <input className="rounded-xl form-control" type="email" onChange={(e) => { setEmail(e.target.value) }} name="" id="" />
                            <label className="form-label" htmlFor="form3Example3c">
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">


                            <input className="rounded-xl form-control" type="text" onChange={(e) => { setPassword(e.target.value) }} name="" id="" />
                            <label className="form-label" htmlFor="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">

                          <input className="btn btn-outline-primary btn-lg" type="submit" onClick={submit} />


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

      {/* </form> */}

    </>
  );
}
