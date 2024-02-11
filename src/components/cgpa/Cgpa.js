import React from 'react'

export default function Cgpa() {
    return (
        <>
            <center>
                <h1>RAJASTHAN TECHNICAL UNIVERSITY</h1>
                <h2>CGPA Calculator </h2>
                <table className="table-striped">
                    <thead>
                        <tr>
                            <th scope="row">Subject</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Cos */}
                        <tr>
                            <td>
                                <select name="" id="">
                                    <option value="">Communication Skills</option>
                                    <option value="">Human Values</option>
                                </select>
                            </td>
                            <td>
                                <div className="select-dropdown">
                                    <select name="" id="cos">
                                        <option value="a">Grade</option>
                                        <option value={10}>A++</option>
                                        <option value={9}>A+</option>
                                        <option value="8.5">A</option>
                                        <option value={8}>B+</option>
                                        <option value="7.5">B</option>
                                        <option value={7}>C+</option>
                                        <option value="6.5">C</option>
                                        <option value={6}>D+</option>
                                        <option value="5.5">D</option>
                                        <option value={5}>E+</option>
                                        <option value={4}>E</option>
                                        <option value={0}>F</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select name="" id="">
                                    <option value="">Language Lab</option>
                                    <option value="">Human Values Activities</option>
                                </select>
                            </td>
                            <td>
                                <div className="select-dropdown">
                                    <select name="" id="coslab">
                                        <option value="a">Grade</option>
                                        <option value={10}>A++</option>
                                        <option value={9}>A+</option>
                                        <option value="8.5">A</option>
                                        <option value={8}>B+</option>
                                        <option value="7.5">B</option>
                                        <option value={7}>C+</option>
                                        <option value="6.5">C</option>
                                        <option value={6}>D+</option>
                                        <option value="5.5">D</option>
                                        <option value={5}>E+</option>
                                        <option value={4}>E</option>
                                        <option value={0}>F</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        {/* maths */}
                        <tr>
                            <td>
                                <select name="" id={4}>
                                    <option value="">Engineering Mathematics-I</option>
                                    <option value="">Engineering Mathematics-II</option>
                                </select>
                            </td>
                            <td>
                                <div className="select-dropdown">
                                    <select name="" id="maths">
                                        <option value="a">Grade</option>
                                        <option value={10}>A++</option>
                                        <option value={9}>A+</option>
                                        <option value="8.5">A</option>
                                        <option value={8}>B+</option>
                                        <option value="7.5">B</option>
                                        <option value={7}>C+</option>
                                        <option value="6.5">C</option>
                                        <option value={6}>D+</option>
                                        <option value="5.5">D</option>
                                        <option value={5}>E+</option>
                                        <option value={4}>E</option>
                                        <option value={0}>F</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        {/* physics */}
                        <tr>
                            <td>
                                <select name="" id="">
                                    <option value="">Engineering Physics</option>
                                    <option value="">Engineering Chemistry</option>
                                </select>
                            </td>
                            <td>
                                <div className="select-dropdown">
                                    <select name="" id="phy">
                                        <option value="a">Grade</option>
                                        <option value={10}>A++</option>
                                        <option value={9}>A+</option>
                                        <option value="8.5">A</option>
                                        <option value={8}>B+</option>
                                        <option value="7.5">B</option>
                                        <option value={7}>C+</option>
                                        <option value="6.5">C</option>
                                        <option value={6}>D+</option>
                                        <option value="5.5">D</option>
                                        <option value={5}>E+</option>
                                        <option value={4}>E</option>
                                        <option value={0}>F</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select name="" id="">
                                    <option value="">Engineering Physics Lab</option>
                                    <option value="">Engineering Chemistry Lab</option>
                                </select>
                            </td>
                            <td>
                                <div className="select-dropdown">
                                    <select name="" id="phylab">
                                        <option value="a">Grade</option>
                                        <option value={10}>A++</option>
                                        <option value={9}>A+</option>
                                        <option value="8.5">A</option>
                                        <option value={8}>B+</option>
                                        <option value="7.5">B</option>
                                        <option value={7}>C+</option>
                                        <option value="6.5">C</option>
                                        <option value={6}>D+</option>
                                        <option value="5.5">D</option>
                                        <option value={5}>E+</option>
                                        <option value={4}>E</option>
                                        <option value={0}>F</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        {/* pps */}
                        <tr>
                            <td>
                                <select name="" id="">
                                    <option value="">Programming for Problem Solving</option>
                                    <option value="">Basic Mechanical Engineering</option>
                                </select>
                            </td>
                            <td>
                                <div className="select-dropdown">
                                    <select name="" id="pps">
                                        <option value="a">Grade</option>
                                        <option value={10}>A++</option>
                                        <option value={9}>A+</option>
                                        <option value="8.5">A</option>
                                        <option value={8}>B+</option>
                                        <option value="7.5">B</option>
                                        <option value={7}>C+</option>
                                        <option value="6.5">C</option>
                                        <option value={6}>D+</option>
                                        <option value="5.5">D</option>
                                        <option value={5}>E+</option>
                                        <option value={4}>E</option>
                                        <option value={0}>F</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        {/* Bee */}
                        <tr>
                            <td>
                                <select name="" id="">
                                    <option value="">Basic Electrical Engineering</option>
                                    <option value="">Basic Civil Engineering</option>
                                </select>
                            </td>
                            <td>
                                <div className="select-dropdown">
                                    <select name="" id="bee">
                                        <option value="a">Grade</option>
                                        <option value={10}>A++</option>
                                        <option value={9}>A+</option>
                                        <option value="8.5">A</option>
                                        <option value={8}>B+</option>
                                        <option value="7.5">B</option>
                                        <option value={7}>C+</option>
                                        <option value="6.5">C</option>
                                        <option value={6}>D+</option>
                                        <option value="5.5">D</option>
                                        <option value={5}>E+</option>
                                        <option value={4}>E</option>
                                        <option value={0}>F</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        {/* cp lab */}
                        <tr>
                            <td>
                                <select name="" id="">
                                    <option value="">Computer Programming Lab</option>
                                    <option value="">Manufacturing Practices Workshop </option>
                                </select>
                            </td>
                            <td>
                                <div className="select-dropdown">
                                    <select name="" id="cp">
                                        <option value="a">Grade</option>
                                        <option value={10}>A++</option>
                                        <option value={9}>A+</option>
                                        <option value="8.5">A</option>
                                        <option value={8}>B+</option>
                                        <option value="7.5">B</option>
                                        <option value={7}>C+</option>
                                        <option value="6.5">C</option>
                                        <option value={6}>D+</option>
                                        <option value="5.5">D</option>
                                        <option value={5}>E+</option>
                                        <option value={4}>E</option>
                                        <option value={0}>F</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        {/* bee lab */}
                        <tr>
                            <td>
                                <select name="" id="">
                                    <option value="">Basic Electrical Engineering Lab</option>
                                    <option value="">Basic Civil Engineering Lab</option>
                                </select>
                            </td>
                            <td>
                                <div className="select-dropdown">
                                    <select name="" id="beelab">
                                        <option value="a">Grade</option>
                                        <option value={10}>A++</option>
                                        <option value={9}>A+</option>
                                        <option value="8.5">A</option>
                                        <option value={8}>B+</option>
                                        <option value="7.5">B</option>
                                        <option value={7}>C+</option>
                                        <option value="6.5">C</option>
                                        <option value={6}>D+</option>
                                        <option value="5.5">D</option>
                                        <option value={5}>E+</option>
                                        <option value={4}>E</option>
                                        <option value={0}>F</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        {/* Caeg */}
                        <tr>
                            <td>
                                <select name="" id="">
                                    <option value="">Computer Aided Engineering Graphics</option>
                                    <option value="">Computer Aided Machine Drawing</option>
                                </select>
                            </td>
                            <td>
                                <div className="select-dropdown">
                                    <select name="" id="caeg">
                                        <option value="a">Grade</option>
                                        <option value={10}>A++</option>
                                        <option value={9}>A+</option>
                                        <option value="8.5">A</option>
                                        <option value={8}>B+</option>
                                        <option value="7.5">B</option>
                                        <option value={7}>C+</option>
                                        <option value="6.5">C</option>
                                        <option value={6}>D+</option>
                                        <option value="5.5">D</option>
                                        <option value={5}>E+</option>
                                        <option value={4}>E</option>
                                        <option value={0}>F</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        {/* sodeca */}
                        <tr>
                            <td>
                                <select name="" id="">
                                    <option value="">SODECA</option>
                                </select>
                            </td>
                            <td>
                                <div className="select-dropdown">
                                    <select name="sodeca" id="sodeca" className="sodeca">
                                        <option value="a">Grade</option>
                                        <option value={10}>A++</option>
                                        <option value={9}>A+</option>
                                        <option value="8.5">A</option>
                                        <option value={8}>B+</option>
                                        <option value="7.5">B</option>
                                        <option value={7}>C+</option>
                                        <option value="6.5">C</option>
                                        <option value={6}>D+</option>
                                        <option value="5.5">D</option>
                                        <option value={5}>E+</option>
                                        <option value={4}>E</option>
                                        <option value={0}>F</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} style={{ textAlign: "center" }}>
                                <button className="btn btn-success" onclick="marks()">
                                    Calculate
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h3 id="final">
                    <br />
                    Final Grade Point :
                </h3>
                <br />
                <h6>
                    NOTE : This is not an official website .The above results are based formula
                    derived from past calculation.
                </h6>
                <br />
                <h6 className="text-center" style={{ color: "green" }}>
                    Designed and Devoleped by @Mark Digital
                </h6>
            </center>

        </>
    )
}
