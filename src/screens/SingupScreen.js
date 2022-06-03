import React from 'react';
import './SingupScreen.css';

/* SIGNUP SCREEN COMPONENT */
const SingupScreen = () => {
  /* RETURN RENDER */
  return (
    <div className='singupScreen'>
      <form>
        <h1>Sign In</h1>
        <input type='email' placeholder='Email' />
      </form>
    </div>
  );
};

export default SingupScreen;
