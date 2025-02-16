import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Navbar';
import SpaceQuiz from './SpaceQuiz';
import AstronomyHallOfFame from './AstronomyHallOfFame';
import GifSlider from './GifSlider';
import Starfield from './starfield';
import Hubble from './hubble';
import BigBangTimeline from './BigBangTimeline';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            <div>Welcome to the Visualizer!</div>
            <GifSlider /> 
            <Starfield /> 
            <Hubble /> 
          </>
        } />
        <Route path="/SpaceQuiz" element={<SpaceQuiz />} />
        <Route
          path="/chatbot.html"
          element={
          <a href="/index1.html" target="_blank" rel="noopener noreferrer">CHATBOT</a>            
          }
        />
        <Route path="/AstronomyHallOfFame" element={<AstronomyHallOfFame />} />
        <Route path="/BigBangTimeline" element={<BigBangTimeline />} />
      </Routes>
    </div>
  );
};

export default App;
