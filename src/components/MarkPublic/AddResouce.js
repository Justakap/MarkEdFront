import React from 'react'
import { Link } from 'react-router-dom';

export default function AddResouce() {
    const addItem = [{
        name: "Subject",
        image: "https://media.licdn.com/dms/image/D560BAQEWQlD8EYy2eA/company-logo_200_200/0/1680374830512/trysubject_logo?e=2147483647&v=beta&t=CHTM-gcsZ3VZOjl9vx_Rw6rzLuGmh9eWKHllIgHuZSI",
        to: "/Modify/Subject"
    },
    {
        name: "Video",
        image: "https://png.pngtree.com/template/20190316/ourmid/pngtree-audio-video-logo-image_80747.jpg",
        to: "/Modify/Video"
    },
    {
        name: "Branch",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_bLVF2ie0UzoHe8rzNmEVy3bahuAPcs2hCNiQtecxEjEvwIPpVehzyd6RbyBeCg8Dl9E&usqp=CAU",
        to: "/Modify/Branch"
    },
    {
        name: "Assesment",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_bLVF2ie0UzoHe8rzNmEVy3bahuAPcs2hCNiQtecxEjEvwIPpVehzyd6RbyBeCg8Dl9E&usqp=CAU",
        to: "/assesment/addAssesment"
    },
    {
        name: "Unit",
        image: "https://scontent.fjai1-1.fna.fbcdn.net/v/t39.30808-6/269927459_1579452182437783_291897840854452569_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=jVV6kBZELgcAX8hZ9DM&_nc_ht=scontent.fjai1-1.fna&oh=00_AfCvPTc2g0rvG3BtqFmVqnTcTiJkx4bk38xu3rq8wJRtHQ&oe=65CCD118",
        to: "/Modify/Unit"
    },
    {
        name: "Assesment Question",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_bLVF2ie0UzoHe8rzNmEVy3bahuAPcs2hCNiQtecxEjEvwIPpVehzyd6RbyBeCg8Dl9E&usqp=CAU",
        to: "/assesment/addQuestion"
    },]

    return (
        <div className='flex flex-wrap justify-around'>
            {addItem.map((element) =>
                <div class=" max-w-sm bg-white border border-gray-200 rounded-lg shadow  m-3 w-72">
                    <div class="flex justify-end px-4 pt-4">

                    </div>
                    <div class="flex flex-col items-center pb-10">
                        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={element.image} alt="Resource" />
                        <h5 class="mb-1 text-xl font-medium text-gray-900 ">Add {element.name}</h5>
                        <div class="flex mt-4 md:mt-6">
                            <Link to={element.to} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add {element.name} →</Link>

                        </div>
                    </div>
                </div>)}

        </div>
    )
}
