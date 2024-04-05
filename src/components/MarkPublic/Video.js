import React, { useEffect, useState } from 'react';
import Videosection from './Videosection';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export default function Video() {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const param2 = queryParams.get('subject');
  const unit = queryParams.get('unit');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/getData`)
      .then(response => setVideos(response.data))
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredVideos = videos.filter((filtered) => (filtered.subject === param2 && filtered.unit == unit ))


  return (
    <>
      <center>
        <input
          className='rounded-md m-4'
          type="text"
          value={filter}
          onChange={handleInputChange}
          placeholder="Search Lecture"
        />
      </center>

      {filteredVideos.map((video, index) => (
        <Videosection
          key={index}
          count={video.count}
          source={video.source}
          subject={video.subject}
          semester={video.semester}
          branch={video.branch}
          notesUrl={video.notesUrl}
          comment={video.comment}
        />
      ))}
      
     
    </>
  );
}
