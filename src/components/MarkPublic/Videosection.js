import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Videosection(props) {
    const { comment, branch, source, semester, subject, notesUrl } = props;
    const [videoInfo, setVideoInfo] = useState(null);

    // Function to extract video ID from YouTube URL
    const fetchVideoId = (source) => {
        const url = new URL(source);
        if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
            const videoId = url.searchParams.get("v");
            return videoId;
        } else {
            console.error("Invalid URL. Not a YouTube URL.");
            return null;
        }
    };

    function formatNumber(number) {
        // Array of suffixes for different magnitudes
        const suffixes = ['', 'K', 'M', 'B', 'T'];

        // Loop through suffixes and determine the appropriate one
        let magnitude = 0;
        while (number >= 1000) {
            number /= 1000;
            magnitude++;
        }

        // Return the formatted number with the appropriate suffix
        return number.toFixed(1) + suffixes[magnitude];
    }


    useEffect(() => {
        // Fetch video info only if source is provided
        if (source) {
            const videoId = fetchVideoId(source);
            if (videoId) {
                const options = {
                    method: 'GET',
                    url: 'https://youtube-v2.p.rapidapi.com/video/details',
                    params: {
                        video_id: videoId
                    },
                    headers: {
                        'X-RapidAPI-Key': 'de102aab60mshcfc1e64ee1fa548p1c1ee8jsn6ca8295c4119',
                        'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
                    }
                };

                axios.request(options)
                    .then(response => {
                        // console.log('Received response:', response.data);
                        setVideoInfo(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching video information:', error);
                    });
            }
        }
    }, [source]);

    return (
        <>
            <div>
                {videoInfo ? (
                    <>
                        <div className="flex px-12 row ">
                            <div className="video my-4 col-md-6">
                                <iframe style={{ height: "65vh" }} className=' rounded-xl w-100' src={`https://www.youtube.com/embed/${fetchVideoId(source)}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; ; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>
                            <div className="sher details bg-gray-200 rounded-lg col-md-6 my-4 p-2" style={{ height: "65vh" }} >
                                <div className="text-center contentVideoTitle">
                                    <div className='text-center text-3xl font-bold mb-2'>Video Details </div>
                                    <div className='font-bold m-2 '>Branch : {branch}</div>
                                    <div className='font-bold m-2 '>Views : {formatNumber(videoInfo.number_of_views)}</div>
                                    <div className='font-bold m-2 '>Sem: {semester}</div>
                                </div>
                                <div className="text-lg my-2 m-2 ">
                                    <span className='font-bold '>Title :</span> {videoInfo.title.slice(0, 60) + "..."}
                                </div>
                                <div className="text-lg my-2 m-2 ">
                                    <span className='font-bold '>Author :</span> {videoInfo.author}
                                </div>

                                <div className="text-lg my-2">
                                    <span className='text-xl font-bold m-2 '>Description :</span>{videoInfo.description.slice(0, 52) + "..."}
                                </div>
                                <div className="text-lg my-2">
                                    <span className='font-bold m-2 '>Subject :</span>{subject}
                                </div>
                                <div className="text-lg my-2">
                                    <span className='font-bold m-2 '>Comments :</span>{comment}
                                </div>
                                <div className="text-xl my-4 px-2 flex">
                                    <a href={notesUrl} target='_blank' rel="noopener noreferrer" className=" my-2 relative px-4 py-1 mx-3 w-40 text-center font-medium text-white group">
                                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
                                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
                                        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
                                        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
                                        <span className="relative">Notes PDF</span>
                                    </a>

                                    <a href={source} target='_blank' rel="noopener noreferrer" className="my-2 relative px-4 py-1 mx-3 w-40 text-center font-medium text-white group">
                                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-red-500 group-hover:bg-red-700 group-hover:skew-x-12"></span>
                                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-red-700 group-hover:bg-red-500 group-hover:-skew-x-12"></span>
                                        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transit  ion-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-red-600 -rotate-12"></span>
                                        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-red-400 -rotate-12"></span>
                                        <span className="relative">Youtube</span>
                                    </a>
                                    {/* Add more links as needed */}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className='text-center'>Fetching Video</p>
                )}
            </div>
        </>
    );
}
