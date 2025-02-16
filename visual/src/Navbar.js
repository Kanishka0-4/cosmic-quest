import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Redirect or perform a search action
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-title">Cosmos Quest</span>
      </div>

      <ul className="navbar-links">
        <li className="navbar-item">
          <Link to="/">HOME</Link>
        </li>
       
        <li className="navbar-item">
        <a href="/index1.html" target="_blank" rel="noopener noreferrer">CHATBOT</a>
        </li>
        <li className="navbar-item">
          <Link to="/AstronomyHallOfFame">HALL OF FAME</Link>
        </li>
        <li className="navbar-item">
          <Link to="/BigBangTimeline">BIG BANG TIMELINE</Link>
        </li>
        <li className="navbar-item">
          <Link to="/SpaceQuiz">SPACE QUIZ</Link>
        </li>
      </ul>

      <div className="navbar-options">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search the cosmos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
