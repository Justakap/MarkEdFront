import React, { useState } from 'react';
import SideBar from './SideBar';

export default function ViewUsers(props) {
    const { users, inbox } = props; // Assuming users is an array of user objects
    const totalMessage = inbox.filter((e) => e.displayed === false).length
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items to display per page

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    // csv 
    const header = ['Name', 'Age', 'Country'];

    function convertArrayToCSV() {
        const headerRow = header.join(',') + '\n';
        const csvBody = users.map(row => {
            return header.map(fieldName => {
                return row[fieldName];
            }).join(',');
        }).join('\n');
        const csvData = headerRow + csvBody;
        downloadCSVAsExcel(csvData, "UserReport.xlsx");
    }

    function downloadCSVAsExcel(csvData, fileName) {
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, fileName);
        } else {
            const link = document.createElement("a");
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }


    return (
        <>
            <div className="flex">
                <SideBar totalMessage={totalMessage} ></SideBar> {/* Render sidebar */}
                <div className="flex-grow mx-auto max-w-screen-lg px-1 py-8 sm:px-8">
                    <div className="flex items-center justify-between pb-6">
                        <div>
                            <h2 className="font-semibold text-gray-700">User Accounts</h2>
                            <span className="text-xs text-gray-500">View accounts of registered users</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="ml-10 space-x-8 lg:ml-40">
                                <button onClick={convertArrayToCSV} className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                    </svg>
                                    CSV
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-y-hidden rounded-lg border">
                        <div className="overflow-x-auto">

                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                                        <th className="px-2 py-3">S.No</th>
                                        <th className="px-5 py-3">Image</th>
                                        <th className="px-5 py-3">Full Name</th>
                                        <th className="px-5 py-3">Email</th>
                                        <th className="px-5 py-3">Branch</th>
                                        <th className="px-5 py-3">Contact</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-500">
                                    {currentItems.map((user, index) => (
                                        <tr key={index}>
                                            <td className="border-b border-gray-200 bg-white pl-5 py-2 text-sm">
                                                <p className="whitespace-no-wrap">{index + 1}</p>
                                            </td>
                                            <td className="border-b border-gray-200 bg-white px-5 py-3 text-sm">
                                                <div className="h-14 w-14 flex-shrink-0">
                                                    <img className="h-full w-full rounded-full" src={user.image} alt="" />
                                                </div>
                                            </td>
                                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                <div className="flex items-center">
                                                    <div className="ml-3">
                                                        <p className="whitespace-no-wrap">{user.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">{user.email}</p>
                                            </td>
                                            <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                                                <p className="whitespace-no-wrap">{user.branch}</p>
                                            </td>
                                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                                                <span className="rounded-full  py-1 text-xs font-semibold">{user.contact}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
                            <span className="text-xs text-gray-600 sm:text-sm">
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, users.length)} of {users.length} Entries
                            </span>
                            <div className="mt-2 inline-flex sm:mt-0">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={indexOfLastItem >= users.length}
                                    className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
