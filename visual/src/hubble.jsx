import React, { useEffect, useState } from 'react';
import './hubble.css';

const HubbleBulletin = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=zEHPTJxaqCMAqL3cefW9cqzXxHgldX3nXpBzC8JF');
        const data = await response.json();
        const imageData = {
          url: data.url,
          title: data.title,
          explanation: data.explanation,
        };
        setImage(imageData);
      } catch (error) {
        console.error('Error fetching Hubble image:', error);
      }
    };

    fetchImage();
  }, []);

  if (!image) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bulletin-container">
      <div className="bulletin-box">
        <div className="bulletin-image">
          <img src={image.url} alt={image.title} />
          <div className="bulletin-title">
            Astronomy Photo of the Day
          </div>
        </div>
        <div className='bulletin-t'>
          <h3>{image.title}</h3>
        </div>
        <div className="bulletin-text">
          <p>{image.explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default HubbleBulletin;
