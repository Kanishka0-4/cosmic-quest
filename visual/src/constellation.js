import React, { useState, useEffect, useRef } from 'react';

const ConstellationVisualizer = () => {
  const [constellations, setConstellations] = useState([]);
  const [selectedConstellation, setSelectedConstellation] = useState('');
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchConstellations = async () => {
      try {
        const API_URL = 'https://api.astronomyapi.com/api/v2/studio/constellations';
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${btoa(
              '431f1174-311b-4135-8343-f05b82d24be0:b0e5e2b217d6fdcb73e6877bb6261a0c835e87b4ba9d7b9fa74aa10d4a9efa25dc0eac29834d96972418ce87dfd719fc87c21c5659106534bb6c97c3777cea0913e7cabac8f63b1b1425b3d6b8daa9c011a419035c5d30665e62eada31c9d0dd6bd8bd15bab87b93bc32999c33f21b0e'
            )}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setConstellations(data.data.constellations);
        } else {
          setError('Failed to fetch constellations.');
        }
      } catch (err) {
        setError('Error fetching constellations.');
      }
    };

    fetchConstellations();
  }, []);

  useEffect(() => {
    if (selectedConstellation) {
      drawConstellation(selectedConstellation);
    }
  }, [selectedConstellation]);

  const drawConstellation = (constellation) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw stars and lines
    constellation.stars.forEach((star) => {
      const { x, y } = star.coordinates; // Assuming API provides normalized coordinates
      ctx.beginPath();
      ctx.arc(x * canvas.width, y * canvas.height, 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();
    });

    constellation.lines.forEach(([startIndex, endIndex]) => {
      const startStar = constellation.stars[startIndex];
      const endStar = constellation.stars[endIndex];

      ctx.beginPath();
      ctx.moveTo(startStar.coordinates.x * canvas.width, startStar.coordinates.y * canvas.height);
      ctx.lineTo(endStar.coordinates.x * canvas.width, endStar.coordinates.y * canvas.height);
      ctx.strokeStyle = 'white';
      ctx.stroke();
    });
  };

  return (
    <div>
      <h1>Constellation Visualizer</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select
        onChange={(e) =>
          setSelectedConstellation(
            constellations.find((c) => c.name === e.target.value)
          )
        }
      >
        <option value="">Select a constellation</option>
        {constellations.map((constellation) => (
          <option key={constellation.name} value={constellation.name}>
            {constellation.name}
          </option>
        ))}
      </select>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ background: 'black', display: 'block', margin: '20px auto' }}
      />
    </div>
  );
};

export default ConstellationVisualizer;
