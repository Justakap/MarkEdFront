import React from 'react'
import './load.css'

export default function Loading() {
    return (
        <>

      

            <svg
                width="80px"
                height="80px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                className="lds-double-ring"
                style={{ background: 'none' }}
            >
                <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#3498db"
                    strokeWidth="4"
                    r="35"
                    strokeDasharray="164.93361431346415 56.97787143782138"
                    transform="rotate(109.832 50 50)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                    ></animateTransform>
                </circle>
                <circle
                    cx="50"
                    cy="50"
                    fill="none"
                    stroke="#e74c3c"
                    strokeWidth="4"
                    r="25"
                    strokeDasharray="78.53981633974483 78.53981633974483"
                    strokeDashoffset="78.53981633974483"
                    transform="rotate(-109.832 50 50)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 50 50;-360 50 50"
                        keyTimes="0;1"
                    ></animateTransform>
                </circle>
            </svg>

        </>
    )
}
