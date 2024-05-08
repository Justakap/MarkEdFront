import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default function AddResource() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/value`)
            .then(response => {
                setResources(response.data);
                setLoading(false); // Set loading to false when data is fetche
            })
            .catch(err => {
                console.error(err);
                setLoading(false); // Set loading to false in case of error
            });
    }, []);

    return (
        <div className='flex flex-wrap justify-between m-2 '>
            {/* Display loading spinner while data is being fetched */}
            {loading ? (

                <Loading></Loading>

            ) : (
                // Render resources once data is fetched
                resources.map((resource, index) => (
                    <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow m-1 w-64">
                        <div className="flex justify-end px-2 pt-4">
                        </div>
                        <div className="flex flex-col items-center pb-10">
                            <img className="w-20 h-20 mb-3 rounded-full shadow-lg" src={resource.image} alt={`Resource ${index}`} />
                            <h5 className="mb-1 text-xl font-medium text-gray-900">Modify {resource.name}</h5>
                            <div className="flex mt-4 md:mt-6">
                                <Link to={`/modify/` + resource.to} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add {resource.name} →</Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
