import React from 'react';
import './HomeScreen.css';
import Nav from './Nav';
import Banner from './Banner';

const HomeScreen = () => {
  /* RETURN RENDER */
  return (
    <div className='homeScreen'>
      <Nav />

      <Banner />

      {/* Row */}
    </div>
  );
};

export default HomeScreen;
