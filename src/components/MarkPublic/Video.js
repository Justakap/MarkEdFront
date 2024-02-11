import React, { useEffect, useState } from 'react';
import Videosection from './Videosection';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line
export default function Video(props) {

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

  const [currentPage, setCurrentPage] = useState(1);
  const recordperPage = 1;
  const lastIndex = currentPage * recordperPage;
  const firstIndex = lastIndex - recordperPage;
  const filteredVideos = videos.filter((filtered) => (filtered.subject === param2 && filtered.unit == unit));
  const records = filteredVideos.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(filteredVideos.length / recordperPage);
  const numbers = [...Array(nPage).keys()].map((num) => num + 1);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

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

      {records.map((video, index) => (
        <Videosection
          key={index}
          count={video.count}
          source={video.source}
          subject={video.subject}
          semester={video.semester}
          branch={video.branch}
          notesUrl={video.notesUrl}
          pyq={video.pyq}
        />
      ))}
      <div style={{ display: 'flex', justifyContent: 'center' }} className='m-2'>
        <nav className='pagination'>
          <li className='page-item'>
            <Link className='page-link' onClick={prevPage}>Prev</Link>
          </li>
          {numbers.map((n, i) => (
            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
              <Link className='page-link' onClick={() => changeCPage(n)}>{n}</Link>
            </li>
          ))}
          <li className='page-item'>
            <Link className='page-link' onClick={nextPage}>Next</Link>
          </li>
        </nav>
      </div>


    </>
  );
}
