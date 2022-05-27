import React, { useEffect, useState } from 'react';
import './Nav.css';

const Nav = () => {
  /* STATE - SHOW NAV__BLACK */
  const [show, handleShow] = useState(false);

  /* FUNC TO SHOW NAV__BLACK IF SCROLLED DOWN PAST 100 */
  const transitionNavBar = () => {
    window.scrollY > 100 ? handleShow(true) : handleShow(false);
  };

  /* EFFECT - TRACK SCROLL FOR transitionNavBar FUNC ABOVE */
  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  });

  /* RETURN RENDER */
  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <div className='nav__contents'>
        <img className='nav__logo' src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' alt='' />
        <img className='nav__avatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='' />
      </div>
    </div>
  );
};

export default Nav;
