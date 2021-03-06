import React, { useRef } from 'react';
// IMPORTING auth FROM LOCAL firebase.js FILE IN src FOLDER //
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './SingupScreen.css';

/* SIGNUP SCREEN COMPONENT */
const SingupScreen = () => {
  /* REF (STATE) - EMAIL AND PASSWORD FROM INPUT FORM BELOW */
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  /* REGISTER USER FUNC */
  const register = (e) => {
    e.preventDefault();

    // TRY TO CREATE USER IN FIREBASE //
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  /* SIGNIN USER FUNC */
  const signIn = (e) => {
    e.preventDefault();

    // TRY TO SIGNIN USER IN FIREBASE //
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  /* RETURN RENDER */
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
