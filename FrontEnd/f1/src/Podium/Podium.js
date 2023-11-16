import React, { useState, useEffect } from 'react';
import './Podium.css'; 

function PodiumFinishers() {
    const [finishers, setDrivers] = useState([]);
    useEffect(() => {
      // Replace '/api/drivers' with your Flask API endpoint
      fetch('http://localhost:5000/frequent_podium_finishers')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setDrivers(data);
          console.log('Drivers loaded:', data);  // Log the state to the console
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }, []);

  return (
    <div className="podium-finishers">
      <div className="podium">
        {finishers.slice(0, 3).map((finisher, index) => (
          <div key={finisher.driver_name} className={`podium-place place-${index + 1}`}>
            <div className="podium-step">{finisher.driver_name}</div>
            <div className="podium-count">{finisher.podium_finishes_count}</div>
          </div>
        ))}
      </div>
      <ul className="finishers-list">
        {finishers.slice(3).map(finisher => (
          <li key={finisher.driver_name}>
            {finisher.driver_name} - {finisher.podium_finishes_count} podiums
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PodiumFinishers;
