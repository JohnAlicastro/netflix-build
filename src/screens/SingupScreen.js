import React, { useRef } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './SingupScreen.css';

const SingupScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  /* REGISTER USER */
  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  /* SIGNIN USER */
  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  return (
    <div className='singupScreen'>
      <form>
        <h1>Sign In</h1>

        <input ref={emailRef} type='email' placeholder='Email' />
        <input ref={passwordRef} type='password' placeholder='Password' />
        <button type='submit' onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className='signupScreen__gray'>New to Netflix? </span>
          <span className='signupScreen__link' onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
};

export default SingupScreen;
