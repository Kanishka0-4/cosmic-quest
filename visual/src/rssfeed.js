import React, { useState, useEffect } from 'react';
import './rss-feed.css';  // Make sure this path is correct

const RssFeed = () => {
  const [rssFeeds, setRssFeeds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRssFeeds = () => {
      fetch('http://localhost:5000/rss')
        .then(response => response.json())
        .then(data => setRssFeeds(data.entries))
        .catch(error => {
          console.error(error);
          setError('Connection lost with space station');
        });
    };

    fetchRssFeeds();
    const interval = setInterval(fetchRssFeeds, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rss-feed-container">
      <h2 className="feed-title">
        <span className="status-dot"></span>
        Space Transmissions
      </h2>

      {error ? (
        <div className="error-message">
          {error}
        </div>
      ) : (
        <div className="feed-content">
          <ul className="rss-feed-list">
            {rssFeeds.map((feed, index) => (
              <li key={index} className="feed-item">
                <a 
                  href={feed.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {feed.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RssFeed;