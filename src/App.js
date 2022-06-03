import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

function App() {
  const user = null;

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
