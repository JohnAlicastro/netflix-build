import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// IMPORTING auth FROM LOCAL firebase.js FILE IN src FOLDER //
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  // TEMP USER VARIABLE USED FOR RETURN RENDER ROUTER BELOW//
  const user = null;

  /* EFFECT - TRACKING IF USER IS LOGGED IN OR NOT */
  useEffect(() => {
    // onAuthStateChanged IS AN EVENT LISTENER FUNC STORED IN THE BROWSER //
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // LOGGED IN //
        console.log(userAuth);
      } else {
        // LOGGED OUT //
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
