import React from 'react';
import NavBar from './Navbar';
import GifSlider from './GifSlider';
import Starfield from './starfield';
import HubbleFiles from './hubble';

const Home = () => {
  return (
    <div>
      <NavBar />
      <Starfield />
      <div className="content">
        <GifSlider />
        <h1 
          style={{ 
            fontSize: '4rem', 
            color: 'white', 
            textAlign: 'center', 
            marginTop: '600px',  // Reduced this value to ensure text is visible
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.8)', 
            position: 'relative',  // Ensures it's positioned above other content
            zIndex: 100  // Ensures it's on top of other elements
          }}
        >
          Let's explore the cosmos together!
        </h1>
        <HubbleFiles />
      </div>
    </div>
  );
};

export default Home;
