import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function SideBar() {

    const [totalMessage, setTotalMessage] = useState()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/Queries`)
            .then(response => setTotalMessage(response.data))
            .catch(err => console.error(err));
    }, []);

    // const messageNumber = 
    // const { totalMessage } = props

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        // Set a flag to track whether the effect has already been executed
        let effectExecuted = false;

        // Use setTimeout to delay the execution of the effect
        const timer = setTimeout(() => {
            const token = localStorage.getItem('token');
            if (token && !effectExecuted) {
                axios.get(`${process.env.REACT_APP_API_BASE_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(response => {
                        const _id = JSON.parse(localStorage.getItem('user'));
                        axios.get(`${process.env.REACT_APP_API_BASE_URL}/userNew?_id=${_id}`)
                            .then(response => {
                                setUser(response.data);
                                if (response.data.isAdmin == false) {
                                    alert("Admin Access Required")
                                    navigate('/Login');
                                }
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => {
                        console.error('Error fetching user data:', err);
                        navigate('/home');
                    });
                effectExecuted = true;
            } else {

                navigate('/login');
            }
        }, 200); // Delay of 1 second

        // Clear the timer if the component unmounts or the effect re-runs
        return () => clearTimeout(timer);
    }, [navigate]);


    const Logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    }
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    return (
        <>


            <aside id="default-sidebar" className=" top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="/Admin/Home" className="flex items-center p-2 text-gray-900 rounded-lg  :text-white hover:bg-gray-100  :hover:bg-gray-700 group">
                                <span onClick={toggleSidebar} className="ms-3">MarkX Education</span>
                            </Link>

                        </li>
                        <li>
                            <Link to="/Admin/Home" className="flex items-center p-2 text-gray-900 rounded-lg  :text-white hover:bg-gray-100  :hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75  :text-gray-400 group-hover:text-gray-900  :group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to ="" className="flex items-center p-2 text-gray-900 rounded-lg  :text-white hover:bg-gray-100  :hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  :text-gray-400 group-hover:text-gray-900  :group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full  :bg-gray-700  :text-gray-300">Pro</span>
                            </Link>
                        </li> */}
                        <li>

                            <Link to="/Admin/Inbox" className="flex items-center p-2 text-gray-900 rounded-lg  :text-white hover:bg-gray-100  :hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  :text-gray-400 group-hover:text-gray-900  :group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full  :bg-blue-900  :text-blue-300">{totalMessage && totalMessage.filter((e) => e.displayed === false).length}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Admin/ViewUsers" className="flex items-center p-2 text-gray-900 rounded-lg  :text-white hover:bg-gray-100  :hover:bg-gray-700 group">

                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  :text-gray-400 group-hover:text-gray-900  :group-hover:text-white" aria-hidden="true" width="800px" height="800px" viewBox="0 -1 24 24" id="meteor-icon-kit__regular-users" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.99978 1.99992C5.7907 1.99992 3.99989 3.79073 3.99989 5.9998C3.99989 8.20888 5.7907 9.9997 7.99978 9.9997C10.2089 9.9997 11.9997 8.20888 11.9997 5.9998C11.9997 3.79073 10.2089 1.99992 7.99978 1.99992zM7.99978 -0.000028C11.3134 -0.000028 13.9996 2.68619 13.9996 5.9998C13.9996 9.3134 11.3134 11.9996 7.99978 11.9996C4.68616 11.9996 1.99994 9.3134 1.99994 5.9998C1.99994 2.68619 4.68616 -0.000028 7.99978 -0.000028zM1.99994 21.0984C1.99994 21.6507 1.55224 22.0984 0.999972 22.0984C0.447703 22.0984 0 21.6507 0 21.0984V18.9994C0 16.2381 2.23851 13.9996 4.99986 13.9996H11.0004C13.7617 13.9996 16.0003 16.2381 16.0003 18.9994V21.0984C16.0003 21.6507 15.5526 22.0984 15.0003 22.0984C14.448 22.0984 14.0003 21.6507 14.0003 21.0984V18.9994C14.0003 17.3426 12.6572 15.9995 11.0004 15.9995H4.99986C3.34305 15.9995 1.99994 17.3426 1.99994 18.9994V21.0984zM15.8006 2.07995C15.2594 1.97008 14.9097 1.44226 15.0196 0.90103C15.1294 0.3598 15.6572 0.01011 16.1985 0.11997C18.9746 0.68349 20.9994 3.13329 20.9994 5.9998C20.9994 8.86632 18.9746 11.3161 16.1985 11.8796C15.6572 11.9895 15.1294 11.6398 15.0196 11.0986C14.9097 10.5573 15.2594 10.0295 15.8006 9.9197C17.649 9.5445 18.9995 7.91056 18.9995 5.9998C18.9995 4.08905 17.649 2.45514 15.8006 2.07995zM19.0002 15.9995C18.4479 15.9995 18.0002 15.5518 18.0002 14.9996C18.0002 14.4473 18.4479 13.9996 19.0002 13.9996C21.7615 13.9996 24 16.2381 24 18.9994V21.0984C24 21.6507 23.5523 22.0984 23.0001 22.0984C22.4478 22.0984 22.0001 21.6507 22.0001 21.0984V18.9994C22.0001 17.3426 20.657 15.9995 19.0002 15.9995z" fill="#758CA3" /></svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Admin/Pricing" className="flex items-center p-2 text-gray-900 rounded-lg  :text-white hover:bg-gray-100  :hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  :text-gray-400 group-hover:text-gray-900  :group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Admin/Modify" className="flex items-center p-2 text-gray-900 rounded-lg  :text-white hover:bg-gray-100  :hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  :text-gray-400 group-hover:text-gray-900  :group-hover:text-white" aria-hidden="true" width="800px" height="800px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.0708 9.58579L15.8282 5.34315C15.0472 4.5621 13.7808 4.5621 12.9998 5.34315L7.34292 11C6.56188 11.7811 6.56188 13.0474 7.34292 13.8284L11.5856 18.0711" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M28.9287 37.4142L33.1714 41.6569C33.9524 42.4379 35.2187 42.4379 35.9998 41.6569L41.6566 36C42.4377 35.219 42.4377 33.9526 41.6566 33.1716L37.414 28.9289" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <rect x="34.6064" y="4.90812" width="12" height="42" rx="2" transform="rotate(45 34.6064 4.90812)" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <circle cx="24" cy="24" r="2" fill="white" />
                                    <circle cx="20" cy="28" r="2" fill="white" />
                                    <circle cx="28" cy="20" r="2" fill="white" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Modify</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/Admin/Profile" className="flex items-center p-2 text-gray-900 rounded-lg  :text-white hover:bg-gray-100  :hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  :text-gray-400 group-hover:text-gray-900  :group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={Logout} className="flex items-center p-2 text-gray-900 rounded-lg  :text-white hover:bg-gray-100  :hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  :text-gray-400 group-hover:text-gray-900  :group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

        </>
    )
}


