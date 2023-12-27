import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <footer style={{backgroundColor:"#000"}} className="">
                <div className="mx-auto w-full max-w-screen-xl">
                    <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-grey-900">Company</h2>
                            <ul className=" text-slate-200 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="#" className=" hover:underline">About</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Careers</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Brand Center</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Blog</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Help center</h2>
                            <ul className=" text-slate-200 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Discord Server</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Twitter</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Facebook</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Legal</h2>
                            <ul className=" text-slate-200 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Privacy Policy</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Licensing</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Terms &amp; Conditions</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Download</h2>
                            <ul className=" text-slate-200 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">iOS</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Android</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Windows</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">MacOS</Link>
                                </li>
                            </ul>
                        </div>

                        <span className="text-sm text-center text-slate-200 dark:text-gray-300 sm:text-center">© {(new Date().getFullYear())} <Link to="">MarkX</Link>. All Rights Reserved.</span>
                    </div>
                </div>
            </footer>

        </>
    )
}
