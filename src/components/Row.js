import React, { useEffect, useState } from 'react';
import './Row.css';
// IMPORTING insatnce AS axios FROM LOCAL axios.js FILE IN api FOLDER //
import axios from '../api/axios.js';
// import requests from '../api/Requests.js';

/* ROW COMPONENT */
const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  /* MOVIES ARRAY FROM FETCH */
  const [movies, setMovies] = useState([]);

  /* BASE URL FOR ALL MOVIES IMAGE */
  const base_url = 'https://image.tmdb.org/t/p/original/';

  /* EFFECT - FETCH REQUEST TO TMDB FOR fetchUrl PROP */
  useEffect(() => {
    try {
      // FETCH DATA FUNC //
      const fetchData = async () => {
        const request = await axios.get(fetchUrl);

        // SET MOVIES ARRAY TO RESULTS //
        setMovies(request.data.results);
        // RETURN REQUEST FOR GOOD MEASURE //
        return request;
      };

      // INVOKE FETCHDATA FUNC //
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [fetchUrl]);

  // console.log(movies);

  /* RETURN RENDER */
  return (
    <div className='row'>
      {/* TITLE OF ROW */}
      <h2>{title}</h2>

      {/* MAP THROUGH MOVIES */}
      {movies.map((movie) => (
        // GET MOVIE IMAGE WITH base_url AND THEN ADDITIONAL URL BASED ON isLargeRow //
        <img src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
      ))}
    </div>
  );
};

export default Row;

// test 2
