import React, { useState } from "react";
import axios from "axios"; // Don't forget to import axios
import { useEffect } from "react";

export default function Inbox(props) {
    const { inbox } = props;
    const [emptyMessage, setEmptyMessage] = useState('')

    useEffect(() => {
        const totalMessage = inbox.filter((e) => e.displayed === false).length;
        if (totalMessage === 0) {
            setEmptyMessage("No Unread Messages");
        } else {
            setEmptyMessage('');
        }
    }, [inbox]);

    const setDisplayed = async (inboxId) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/setDisplayed/${inboxId}`);
            if (response.data === "updated") {   
                window.location.reload();
            } else {
                alert("Failed to update status.");
            }
        } catch (error) {
            console.error("Server Error:", error);
            alert("Server Error");
        }
    };

    return (
        <>
            {inbox.filter((e) => e.displayed === false).map((message) => (
                <div key={message._id} className="relative m-4 my-10 rounded-lg bg-gray-600 px-12 py-6 shadow-md">
                    <button onClick={() => setDisplayed(message._id)} className="absolute top-0 right-0 p-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <p className="relative mb-1 text-md font-medium">
                        <span className="absolute -left-7 flex h-5 w-5 items-center justify-center rounded-xl text-white">
                            <svg width="208px" height="208px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-4" stroke="#e4d101" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier"> <path d="M7 9H17M7 13H12M21 20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20Z" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /> </g>
                            </svg>
                        </span>
                        <span className="text-gray-50">{message.subject}</span><span className="text-gray-200 text-xs pl-2">~{message.email}</span>
                    </p>
                    <p className="text-sm text-gray-200">{message.message}</p>
                </div>
            ))}
            <p className=" m-14 text-center">
                {emptyMessage}
            </p>
        </>
    );
}
