import React from 'react';
import cimg from '../../images/7ae06f20-47cd-49b2-9830-826a56cea34b.jpg'

export default function CommingSoon() {
    return (
        <>
            <>
                {/* component */}
                <div className="w-full">
                    <div className="flex bg-white h-screen">
                        <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                            <div>
                                <span className="text-2xl font-semibold text-gray-800 md:text-4xl">
                                    ⏰ Coming<span className="ml-2 text-blue-600">Soon</span> ⏰
                                </span>
                                <h1 className="py-5 text-5xl font-semibold text-gray-800 md:text-6xl">
                                    MarkX<span className="ml-2 text-blue-600">Community</span>
                                </h1>
                                <p className="mt-2 text-sm text-gray-500 md:text-lg">
                                    Get ready to join the MarkX Community, a vibrant hub where creators, innovators, and enthusiasts come together to explore, collaborate, and grow. Whether you're a seasoned professional or just starting your journey, MarkX Community offers a supportive space to connect, learn, and thrive.
                                </p>
                                <div className="flex space-x-3 justify-center lg:justify-center mt-6 text-center">
                                    <a
                                        href="https://www.facebook.com/FontGen/"
                                        className="bg-blue-500 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
                                    >
                                        <svg
                                            className="w-5 h-5 fill-current"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        <span>Facebook</span>
                                    </a>
                                    <a
                                        href="https://twitter.com/FontGen"
                                        className="bg-blue-300 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
                                    >
                                        <svg
                                            className="w-5 h-5 fill-current"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                        <span>Twitter</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block lg:w-1/2">
                            <div
                                className="h-full object-fill"
                                style={{
                                    backgroundImage:
                                        `url(${cimg})`
                                }}
                            >
                                <div className="h-full opacity-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </>
    )
}
