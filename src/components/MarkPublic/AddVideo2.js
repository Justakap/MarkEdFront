import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function AddVideo2() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subject = queryParams.get('Subject');
  const unit = queryParams.get('Unit');
  const semester = queryParams.get('Semester');
  const branch = queryParams.get('Branch');

  const [successMessage, setSuccessMessage] = useState(null);
  const [formData, setFormData] = useState({
    subject: subject,
    unit: unit,
    semester: semester,
    branch: branch,
    source: '',
    notesUrl: '',
    comment: '',
    playlistNotesUrl: '',
    playlistComment: ''
  });
  const [playlistSource, setPlaylistSource] = useState('');
  const [playlistInfo, setPlaylistInfo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/Modify/Video/Add`, formData);

      if (response.data === "added") {
        setSuccessMessage("Video added successfully!");
        window.location.reload();
      } else if (response.data === "exist") {
        alert("Video already exists.");
      } else if (response.data === "nadded") {
        alert("Video not added.");
      }
    } catch (error) {
      console.error("Server Error:", error);
      alert("Server Error");
    }
  };

  const videoID = async (e) => {
    e.preventDefault();
    if (!playlistSource) {
      alert("Please enter a valid playlist URL.");
      return;
    }

    const playListId = fetchPlaylistId(playlistSource);
    console.log(playListId)
    if (!playListId) {
      alert("Invalid playlist URL. Please enter a valid YouTube playlist URL.");
      return;
    }

    try {
      const options = {
        method: 'GET',
        url: 'https://youtube138.p.rapidapi.com/playlist/videos/',
        params: {
          id: playListId,
          hl: 'en',
          gl: 'US'
        },
        headers: {
          'X-RapidAPI-Key': 'de102aab60mshcfc1e64ee1fa548p1c1ee8jsn6ca8295c4119',
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      setPlaylistInfo(response.data);




      // console.log(playlistInfo)
    } catch (error) {
      console.error('Error fetching video information:', error);
      alert("Error fetching video information. Please try again.");
    }
  };

  const fetchPlaylistId = (source) => {
    const url = new URL(source);
    if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
      console.log(url.searchParams.get("list"))
      return url.searchParams.get("list");
    } else {
      console.error("Invalid URL. Not a YouTube URL.");
      return null;
    }
  };

  function showWinning() {
    const popUp = document.getElementById("popUp");
    popUp.hidden = !popUp.hidden;

  }

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    for (let i = 0; i < playlistInfo.contents.length; i++) {

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/Modify/Video/bulkAdd`, {
          subject: formData.subject,
          unit: formData.unit,
          semester: formData.semester,
          branch: formData.branch,
          // source: `www.youtube.com/watch?v=${playlistInfo.contents[i].video.videoId}`,
          source: `https://www.youtube.com/watch?v=${playlistInfo.contents[i].video.videoId}`,

          notesUrl: formData.playlistNotesUrl,
          comment: formData.playlistComment
        });

        if (response.data === "added") {
          setSuccessMessage("Video added successfully!");
        } else if (response.data === "exist") {
          alert("Video already exists.");
        } else if (response.data === "nadded") {
          alert("Video not added.");
        }
      } catch (error) {
        console.error("Server Error:", error);
        alert("Server Error");
      }
      

      // console.log(playlistInfo.contents[i].video.videoId)
    }
    window.location.reload();
  }
  return (
    <div className=''>

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <h1 className=' text-center text-3xl my-3'>Showing {subject}</h1>
      <h1 className=' text-center text-3xl my-3'> Unit - {unit} </h1>
      <hr className=' w-4/5 m-auto my-3' />
      <div className="flex">
        <div className='flex ml-6 justify-center flex-wrap mb-8'>
          <div className="text-center max-w-sm w-72 p-4 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add Video</h5>
            <hr />
            <form onSubmit={handleSubmit}>
              <input onChange={handleInputChange} value={formData.source} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-1 mt-3' type="text" placeholder='Enter Video URL' name="source" required />
              <input onChange={handleInputChange} value={formData.notesUrl} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-2' type="text" placeholder='Enter Notes URL' name="notesUrl" />
              <input onChange={handleInputChange} value={formData.comment} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-2' type="text" placeholder='Enter Comments (if Req)' name="comment" />
              <button type="submit" className="mt-3 focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-800">Add Video</button>
              <button onClick={showWinning} className="mt-3 focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-200 dark:hover:bg-blue-300 dark:focus:ring-blue-800">Bulk Upload</button>
            </form>
          </div>
        </div>
        {/* Bulk Upload */}
        <div id="popUp" hidden>
          <div className='flex ml-6 justify-center flex-wrap mb-8'>
            <div className="text-center max-w-sm w-72 p-4 m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add Video's</h5>
              <hr />
              <form onSubmit={videoID}>
                <input onChange={(e) => setPlaylistSource(e.target.value)} value={playlistSource} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-1 mt-3' type="text" placeholder='Enter Playlist URL' required />
                <input onChange={handleInputChange} value={formData.playlistNotesUrl} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-2' type="text" placeholder='Enter Notes URL' name="playlistNotesUrl" />
                <input onChange={handleInputChange} value={formData.playlistComment} className='border-b-1 border-r-0 border-t-0 border-l-0 text-sm my-2' type="text" placeholder='Enter Comments (if Req)' name="playlistComment" />
                <button type="submit" className="mt-3 focus:outline-none text-white  bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-200 dark:hover:bg-blue-300 dark:focus:ring-blue-800">Get Videos</button>
              </form>
              {playlistInfo && <button onClick={handleBulkUpload} className="mt-3 focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-800">Upload Videos</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
