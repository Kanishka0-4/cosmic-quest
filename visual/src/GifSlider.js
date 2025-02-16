import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GifSlider.css';
import './rss-feed.css';

const GifSlider = () => {
  const gifs = [
    '/gifs/gif1.gif',
    '/gifs/gif2.gif',
    '/gifs/gif3.gif',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [rssFeeds, setRssFeeds] = useState([]);

  useEffect(() => {
    const fetchRssFeeds = () => {
      fetch('http://localhost:5000/rss')
        .then(response => response.json())
        .then(data => setRssFeeds(data.entries))
        .catch(error => console.error("Error fetching RSS feeds:", error));
    };

    fetchRssFeeds(); // Fetch immediately on mount

    const interval = setInterval(fetchRssFeeds, 30000); // Fetch every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [gifs.length]);

  return (
    <div>
      {/* Slider */}
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {gifs.map((gif, index) => (
            <div key={index} className="slider-item">
              <img src={gif} alt={`Gif ${index}`} className="gif-image" />
            </div>
          ))}
        </div>
      </div>

      {/* RSS Feed Corner */}
      <div className="funfact-corner">
        <h3>Latest Space News</h3>
        <ul>
          {rssFeeds.map((feed, index) => (
            <li key={index}>
              <a href={feed.link} target="_blank" rel="noopener noreferrer">
                {feed.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GifSlider;
