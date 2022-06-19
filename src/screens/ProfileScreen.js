import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
// IMPORTING auth FROM LOCAL firebase.js FILE IN src FOLDER //
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Nav from '../components/Nav';
import './ProfileScreen.css';

/* PROFILESCREEN COMPONENT */
const ProfileScreen = () => {
  /* USER VARIABLE GETTING user FROM REDUX STORE, USED FOR RETURN RENDER ROUTER BELOW */
  const user = useSelector(selectUser);

  /* RETURN RENDER */
  return (
    <div className='profileScreen'>
      <Nav />
      <div className='profileScreen__body'>
        <h1>Edit Profile</h1>
        <div className='profileScreen__info'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='' />
          {/* <div className='profileScreen__details'>
            <h2>{user.email}</h2>
            <div className='profileScreen__plans'>
              <h3>Plans</h3>
              <button className='profileScreen__signOut' onClick={() => signOut(auth)}>
                Sign Out
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
