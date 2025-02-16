import React, { useState } from 'react'; 
import './HallOfFame.css'; 
import astronomers from './astronomers.json'; 

const AstronomyHallOfFame = () => { 
  const [filteredAstronomers, setFilteredAstronomers] = useState(astronomers); 
  const [search, setSearch] = useState(''); 
  const [showFunFact, setShowFunFact] = useState(false); 
  const [currentFunFact, setCurrentFunFact] = useState('');

  const handleSearch = (e) => { 
    const query = e.target.value.toLowerCase(); 
    setSearch(query); 
    setFilteredAstronomers( 
      astronomers.filter((astronomer) => 
        astronomer.name.toLowerCase().includes(query) 
      ) 
    ); 
  };

  const handleFunFactClick = (funFact) => {
    setCurrentFunFact(funFact);
    setShowFunFact(true);

    setTimeout(() => {
      setShowFunFact(false); // Hide the fun fact card after a few seconds
    }, 3000); // Fun fact card will disappear after 3 seconds
  };

  return ( 
    <div className="hall-of-fame">
      <h1>Space Hall of Fame</h1>
      <input 
        type="text" 
        placeholder="Search..." 
        value={search} 
        onChange={handleSearch} 
        className="search-bar" 
      /> 

      <div className="grid-container">
        {filteredAstronomers.map((astronomer, index) => (           
          <div key={index} className="card">
            <img 
              src={astronomer.portrait} 
              alt={astronomer.name} 
              className="portrait" 
            />
            <h2>{astronomer.name}</h2>
            <p>Field: {astronomer.field}</p>
            <p>Timeline: {astronomer.timeline}</p>
            <p>Contribution: {astronomer.contributions}</p>
            <button 
              className="details-btn" 
              onClick={() => handleFunFactClick(astronomer.funFact)}
            >
              Fun Fact
            </button>
          </div> 
        ))}
      </div>

      {showFunFact && (
        <div className="fun-fact-card">
          <p>{currentFunFact}</p>
        </div>
      )}
    </div>
  ); 
}; 

export default AstronomyHallOfFame;
