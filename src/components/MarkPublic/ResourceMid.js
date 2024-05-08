import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
export default function ResourceMid(props) {
    const { branch } = props
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const param1 = queryParams.get('branch');


    const [selectedSemester, setSelectedSemester] = useState(null);
    const [subject, setSubject] = useState([]);
    const [semesterCount, setSemesterCount] = useState([]);
    const [firstText, setFirstText] = useState();

    const selectedBranchDetails = branch.filter((e) => e.branch === param1)
    console.log(selectedBranchDetails[0].subBranches[0])

     
    const handleSemesterClick = (semester) => {
        // Do something with the selected semester value
        setSelectedSemester(semester);
    };
    
    


    return (
        <>
            <div className='text-center m-2'>
                
            </div>
            <h2 id='semesterText' className=' font-bold text-3xl text-emerald-500 text-center my-4'>Select Sub Category</h2>

            <div className="flex flex-wrap justify-around" id="semester">


                {selectedBranchDetails && selectedBranchDetails.length > 0 && (
                    
                        <>
                            {/* <button
                            key={e.value}
                            value={e.value}
                            onClick={() => handleSemesterClick(e.value)}
                            className={`circle px-8 text-3xl py-6 mx-10 ml-16 my-5 bg-blue-500 rounded-full text-white ${selectedSemester === e.value ? 'bg-green-500' : ''}`}
                        >
                            {e.typeName}{e.display}
                        </button> */}
                            <select name="" id="">
                                {selectedBranchDetails[0].subBranches.map((e) => (
                                    <>
                                        <option value="">{e.typeName}{e.display}</option>
                                        
                                    </>
                                ))}
                            </select>
                        </>
                    )}


                {/* {semesterCount.map((semester) => (
                    <>
                        <button
                            key={semester}
                            value={semester}
                            onClick={() => handleSemesterClick(semester)}
                            className={`circle px-8 text-3xl py-6 mx-10 ml-16 my-5 bg-blue-500 rounded-full text-white ${selectedSemester === semester ? 'bg-green-500' : ''}`}
                        >
                            {semester}
                        </button>
                       
                    </>

                ))} */}
            </div>
        </>
    )
}
