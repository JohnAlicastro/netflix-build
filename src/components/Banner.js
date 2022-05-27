import React from 'react';
import './Banner.css';

const Banner = () => {
  /* FUNC TO TRUNCATE DESCRIPTION IF OVER n CHARACTERS LONG */
  const truncate = (string, n) => {
    return string?.length > n ? string.substring(0, n - 1) + '...' : string;
  };

  /* RETURN RENDER */
  return (
    <header
      className='banner'
      style={{
        // backgroundImage: `url('https://i.imgur.com/e1hLQ2m.png')`,
        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_flag.svg/1200px-Black_flag.svg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>Movie Name</h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>
        <h1 className='banner__description'>
          {truncate(
            `This is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test
            descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a
            test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis
            is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test descriptionThis is a test
            descriptionThis is a test descriptionThis is a test description`,
            150
          )}
        </h1>
      </div>
      <div className='banner--fadeBottom' />
    </header>
  );
};

export default Banner;
