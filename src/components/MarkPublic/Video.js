import React, { useEffect, useState } from 'react';
import Videosection from './Videosection';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar4 from './Navbar4';
import Navbar from './Navbar';

export default function Video() {


  const token = localStorage.getItem('token');
  const navigation = token ? <Navbar4 /> : <Navbar />;

  const [videos, setVideos] = useState([]);
  // eslint-disable-next-line
  const [filter, setFilter] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const param2 = queryParams.get('subject');
  const unit = queryParams.get('unit');

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_BASE_URL}/getData`, {
  //     method: "GET"
  //   }) 
  //     .then(response => response.json()) // Parse response as JSON
  //     .then(data => setVideos(data)) // Set fetched data to state variable
  //     .catch(err => console.log(err));
  // }, []);




  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/getData`)
      .then(response => setVideos(response.data))
      .catch(err => console.log(err));
  }, []);
  // eslint-disable-next-line
  const handleInputChange = (event) => {
    setFilter(event.target.value);
  };
  // eslint-disable-next-line
  const filteredVideos = videos.filter((filtered) => (filtered.subject === param2 && filtered.unit == unit))



  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); // Number of items to display per page

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVideos.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>

      {navigation}

      <div className="flex flex-col items-center border-t bg-white px-5 sm:flex-row sm:justify-between">
        <span className="text-xs text-gray-600 sm:text-sm">
          Showing {filteredVideos.length == 0 ? 0 : indexOfFirstItem + 1}  of {filteredVideos.length} Videos
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
            disabled={indexOfLastItem >= filteredVideos.length}
            className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
      {currentItems.map((video, index) => (
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
