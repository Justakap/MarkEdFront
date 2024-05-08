import React from 'react'
import { Link } from 'react-router-dom'

export default function StayTuned() {
    return (<>
        <div class=" h-96  bg-slate-200 overflow-hidden pb-28 ">
            <Link className='bg-blue-300 p-2 px-3 rounded-md text-xl ' to={"/resources"}> ← </Link>
            <h2 class="text-black text-center text-3xl my-10 mb-5 md:text-6xl font-bold">
                Stay Tuned !
            </h2>
            <p className=' text-black font-semibold text-center text-2xl mt-8'>
                Our Team is Constantly Working Hard for the Updation of the Courses !
            </p>
        </div>
    </>
    )
}
