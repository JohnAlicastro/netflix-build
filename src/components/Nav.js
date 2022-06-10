import React, { useEffect, useState } from 'react';
/* useHistory is depricated */
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Nav.css';

/* NAV COMPONENT */
const Nav = () => {
  /* STATE - SHOW NAV__BLACK */
  const [show, handleShow] = useState(false);

  /* HISTORY - REACT ROUTER DOM - PUSHING '/profile' ONCLICK OF nav__avatar img IN RETURN RENDER BELOW */
  /* useHistory is depricated */
  // const history = useHistory();

  /* NAVIGATE - REACT ROUTER DOM - PASSING IN '/profile' or '/' ONCLICK OF imgS IN RETURN RENDER BELOW */
  const navigate = useNavigate();

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
        <img className='nav__logo' src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' alt='' onClick={() => navigate('/')} />
        <img className='nav__avatar' src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='' onClick={() => navigate('/profile')} />
      </div>
    </div>
  );
};

export default Nav;
