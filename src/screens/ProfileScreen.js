import React from 'react';
import Nav from '../components/Nav';
import './ProfileScreen.css';

/* PROFILESCREEN COMPONENT */
const ProfileScreen = () => {
  /* RETURN RENDER */
  return (
    <div className='profileScreen'>
      <Nav />
      <div className='profileScreen__body'>
        <h1>Edit Profile</h1>
        <div className='profileScreen__info'>
          <img src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png' alt='' />
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
