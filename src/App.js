import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/HomeScreen';

function App() {
  /* RETURN RENDER */
  return (
    <div className='app'>
      {/* <HomeScreen /> */}

      <Router>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
