import React, { useEffect, useState } from 'react';
import './Banner.css';
// IMPORTING insatnce AS axios FROM LOCAL axios.js FILE IN api FOLDER //
import axios from '../api/axios.js';
import requests from '../api/Requests.js';

/* BANNER COMPONENT */
const Banner = () => {
  /* MOVIE TO BE DISPLAYED */
  const [movie, setMovie] = useState([]);

  /* EFFECT - FETCH REQUEST TO TMDB FOR NETFLIXORIGINALS ON BANNER MOUNT */
  useEffect(() => {
    try {
      // FETCH DATA FUNC //
      const fetchData = async () => {
        const request = await axios.get(requests.fetchNetflixOriginals);

        // SET MOVIE TO RANDOM ONE FROM RESULTS //
        setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
        // RETURN REQUEST FOR GOOD MEASURE //
        return request;
      };

      // INVOKE FETCHDATA FUNC //
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(movie);

  /* FUNC TO TRUNCATE DESCRIPTION IF OVER n CHARACTERS LONG */
  const truncate = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + '...' : string;
  };

  /* RETURN RENDER */
  return (
    <header
      className='banner'
      style={{
        // BLACK BACKGROUND (TEMP) //
        // backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_flag.svg/1200px-Black_flag.svg.png')`,
        // BACKGROUND IMAGE FROM MOVIE TO BE DISPLAYED //
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner__contents'>
        {/* <h1 className='banner__title'>Movie Name</h1> */}
        <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>
        <h1 className='banner__description'>
          {/* {truncate(
            `This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description This is a test description `,
            150
          )} */}
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className='banner--fadeBottom' />
    </header>
  );
};

export default Banner;
