import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
// IMPORTING auth FROM LOCAL firebase.js FILE IN src FOLDER //
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

/* APP COMPONENT */
function App() {
  /* TEMP USER VARIABLE USED FOR RETURN RENDER ROUTER BELOW */
  // const user = null;

  /* USER VARIABLE GETTING user FROM REDUX STORE, USED FOR RETURN RENDER ROUTER BELOW */
  const user = useSelector(selectUser);

  /* dispatch VARIABLE TO INVOKE useDispatch FROM REDUX  */
  const dispatch = useDispatch();

  /* EFFECT - TRACKING IF USER IS LOGGED IN OR NOT & DISPATCHING ACTIONS FROM REDUX */
  useEffect(() => {
    // onAuthStateChanged IS AN EVENT LISTENER FUNC STORED IN THE BROWSER //
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // LOGGED IN
        // console.log(userAuth);
        /* DISPATCH LOGIN ACTION FROM REDUX */
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // LOGGED OUT
        /* DISPATCH LOGOUT ACTION FROM REDUX */
        dispatch(logout);
      }
    });

    // RETURN unsubscribe AS A FUNCTION SO THAT WE DONT DUPLICATE THE onAuthStateChanged LISTENER, //
    // WE UNMOUNT THE CURRENT ONE AND THEN MOUNT A NEW ONE //
    return unsubscribe;
  }, []);

  /* RETURN RENDER */
  return (
    <div className='app'>
      {/* <HomeScreen /> */}

      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Routes>
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
