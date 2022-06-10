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
      </div>
    </div>
  );
};

export default ProfileScreen;
