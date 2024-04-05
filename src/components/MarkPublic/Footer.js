import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
            <footer className="footerBackground">
                <div className="mx-auto w-full max-w-screen-xl">
                    <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-grey-900">Features</h2>
                            <ul className=" text-slate-200 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="#" className=" hover:underline">About</Link>
                                </li>
                                <li className="mb-4">
                                    <Link to="/modify" className="hover:underline">Modification</Link>
                                </li>

                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Help center</h2>
                            <ul className=" text-slate-200 dark:text-gray-400 font-medium">

                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Contact Us</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Legal</h2>
                            <ul className=" text-slate-200 dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <Link to="/login" className="hover:underline">Privacy Policy</Link>
                                </li>

                                <li className="mb-4">
                                    <Link to="#" className="hover:underline">Terms &amp; Conditions</Link>
                                </li>
                            </ul>
                        </div>


                    </div>
                    <div className="text-center pb-1">
                        <span className="text-sm text-center text-slate-200 dark:text-gray-300 sm:text-center">© {(new Date().getFullYear())} <Link to="">MarkX</Link>. All Rights Reserved.</span><br />
                        <span className="text-sm text-center text-slate-200 dark:text-gray-300 sm:text-center">Version 2.6.0</span>

                    </div>
                </div>
            </footer>

        </>
    )
}
