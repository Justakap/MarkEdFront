import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Videosection(props) {
    const { comment,branch, source, semester, subject, notesUrl } = props;

    function convertToEmbeddedUrl(source) {
        const url = new URL(source);
      
        // Check if it's a YouTube URL
        if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
          // Extract video ID from the URL
          const videoId = url.searchParams.get("v");
      
          if (videoId) {
            // Construct the embedded URL
            const embeddedUrl = `https://www.youtube.com/embed/${videoId}`;
                                       
            return embeddedUrl;
          } else {
            // Handle case where video ID is not present
            console.error("Invalid YouTube URL. Video ID not found.");
          }
        } else {
          // Handle case where URL is not from YouTube
          console.error("Invalid URL. Not a YouTube URL.");
        }
      }



    function extractVideoIdFromEmbed(embedUrl) {
        const match = embedUrl.match(/(?:\/|v=)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    }
    const vedioId = extractVideoIdFromEmbed(source);

    const YouTubeVideoInfo = () => {
        // const videoUrl = 'https://www.youtube.com/watch?v=BSGcQi2WNPg';
        // const vedioId = 'BSGcQi2WNPg'
        const videoUrl = `https://www.youtube.com/watch?v=${vedioId}`;
        const [videoInfo, setVideoInfo] = useState(null);

        useEffect(() => {
            const getYouTubeVideoInfo = async () => {
                const videoId = extractVideoId(videoUrl);

                try {
                    // Replace 'YOUR_API_KEY' with your actual YouTube Data API key
                    const apiKey = 'AIzaSyBXCqWphfiT-lVkRbJsmVtZau6APLKjhDA';
                    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`;

                    const response = await axios.get(apiUrl);
                    const snippet = response.data.items[0].snippet;

                    setVideoInfo(snippet);
                } catch (error) {
                    console.error('Error fetching video information:', error);
                }
            };

            getYouTubeVideoInfo();
        }, [videoUrl]);

        const extractVideoId = (url) => {
            const match = url.match(/[?&]v=([^?&]+)/);
            return match && match[1] ? match[1] : null;
        };

        return (

            <>

                <div>
                    {videoInfo ? (
                        <>

                            <div className="flex px-12 row ">
                                <div className="video my-4 col-md-6">

                                    <iframe style={{ height: "45vh" }} className=' rounded-xl w-100' src={ convertToEmbeddedUrl(source)} title="YouTube video player" frame-border="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                </div>
                                <div className="sher details bg-gray-200 rounded-lg col-md-6 my-4 p-2" style={{ height: "45vh" }} >
                                    <div className="text-center contentVideoTitle">
                                        <div className='text-center text-3xl font-bold mb-2'>Video Details </div>
                                        <div className='font-bold m-2 '>Branch : {branch}</div>
                                        <div className='font-bold m-2 '>Sem: {semester}</div>
                                    </div>
                                    
                                    <div className="text-lg my-2 m-2 ">
                                        <span className='font-bold '>Title :</span> {videoInfo.title.slice(0, 50) + "..."}
                                    </div>
                                    <div className="text-lg my-2">
                                        <span className='text-xl font-bold m-2 '>Description :</span>{videoInfo.description.slice(0, 57) + "..."}
                                    </div>
                                    <div className="text-lg my-2">
                                        <span className='font-bold m-2 '>Subject :</span>{subject}
                                    </div>
                                    <div className="text-lg my-2">
                                        <span className='font-bold m-2 '>Comments :</span>{comment}
                                    </div>
                                   
                                    {/* <div className="text-lg my-2">
                                        <span className='font-bold m-2 '>Year :</span>{year}
                                    </div> */}
                                    <div className="text-xl my-4 px-2 flex">
                                        {/* <span className='font-bold m-2 '>Notes :</span> */}
                                        <Link to={notesUrl} target='_blank' className=" my-2 relative px-4 py-1 mx-3 w-40 text-center font-medium text-white group">
                                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
                                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
                                            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
                                            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
                                            <span className="relative">Notes PDF</span>
                                        </Link>

                                        <Link to={source} target='_blank' className="my-2 relative px-4 py-1 mx-3 w-40 text-center font-medium text-white group">
                                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-red-500 group-hover:bg-red-700 group-hover:skew-x-12"></span>
                                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-red-700 group-hover:bg-red-500 group-hover:-skew-x-12"></span>
                                            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transit  ion-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-red-600 -rotate-12"></span>
                                            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-red-400 -rotate-12"></span>
                                            <span className="relative">Youtube</span>
                                        </Link>
                                        <Link to="" target='_blank' className="my-2 relative px-4 py-1 mx-3 w-40 text-center font-medium text-white group">
                                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-blue-500 group-hover:bg-blue-400 group-hover:skew-x-12"></span>
                                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-blue-700 group-hover:bg-blue-500 group-hover:-skew-x-12"></span>
                                            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transit  ion-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-blue-600 -rotate-12"></span>
                                            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-blue-400 -rotate-12"></span>
                                            <span className="relative">PYQ</span>
                                        </Link>

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
    };

    return <YouTubeVideoInfo />;
}
