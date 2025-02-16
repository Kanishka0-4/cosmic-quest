import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./constellationTracker.css";

const ConstellationTracker = () => {
  const [date, setDate] = useState(new Date());
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [constellations, setConstellations] = useState([]);
  const [starChartUrl, setStarChartUrl] = useState("");
  const [error, setError] = useState("");

  const fetchConstellations = async () => {
    setError("");
    setConstellations([]);
    setStarChartUrl("");
    try {
      const formattedDate = date.toISOString();
      const response = await axios.get("https://stellarium-web.org/api/star-chart", {
        params: {
          lat: latitude,
          lng: longitude,
          date: formattedDate,
          constellations: true,
        },
      });

      setStarChartUrl(response.data.url || ""); // Star chart image URL
      setConstellations(response.data.constellations || []); // Constellation names
    } catch (err) {
      setError("Unable to fetch constellations. Please check your inputs.");
      console.error("Error fetching constellation data:", err);
    }
  };

  return (
    <div className="tracker-container">
      <h2 className="tracker-title">Constellation Tracker</h2>

      <div className="tracker-inputs">
        <div className="input-group">
          <label>Select Date:</label>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>
        <div className="input-group">
          <label>Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter latitude"
          />
        </div>
        <div className="input-group">
          <label>Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter longitude"
          />
        </div>
      </div>

      <button className="tracker-button" onClick={fetchConstellations}>
        Check Constellations
      </button>

      {error && <p className="tracker-error">{error}</p>}

      {starChartUrl && (
        <div className="tracker-star-chart">
          <h3>Star Chart:</h3>
          <img src={starChartUrl} alt="Star Chart" className="star-chart-image" />
        </div>
      )}

      <div className="tracker-results">
        <h3>Visible Constellations:</h3>
        {constellations.length > 0 ? (
          <ul>
            {constellations.map((constellation, index) => (
              <li key={index}>{constellation.name}</li>
            ))}
          </ul>
        ) : (
          <p>No data yet! Enter a date and location.</p>
        )}
      </div>
    </div>
  );
};

export default ConstellationTracker;
