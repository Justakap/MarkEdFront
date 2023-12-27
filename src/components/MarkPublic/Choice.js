import React from 'react'
import { Link } from 'react-router-dom';

export default function Choice(props) {
    let { type, to, desc, image } = props;
    return (
        <>
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-end px-4 pt-4">

                </div>
                <div class="flex flex-col items-center pb-10 flex-wrap">
                    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={image} alt="Resource" />
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{type}</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{desc}</span>
                    <div class="flex mt-4 md:mt-6">
                        <Link to={`/` + to} class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Explore →</Link>

                    </div>
                </div>
            </div>


        </>
    )
}
