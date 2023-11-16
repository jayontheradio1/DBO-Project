import React, { useState, useEffect } from 'react';
import './seasons.css'

const Seasons = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [resultsByRace, setResultsByRace] = useState({});
  const [years, setYears] = useState(['2021', '2022', '2023','2019']); // Placeholder, you might want to fetch this from your API or define it statically

  useEffect(() => {
    if (selectedYear) {
      fetch(`http://localhost:5000/results1?year=${selectedYear}`)
        .then(response => response.json())
        .then(data => {
          // Assuming 'data' is an array of result objects
          const sortedResults = data.reduce((acc, result) => {
            // Group results by race_id
            if (!acc[result.race_id]) {
              acc[result.race_id] = [];
            }
            acc[result.race_id].push(result);
            return acc;
          }, {});

          setResultsByRace(sortedResults);
        });
    }
  }, [selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className='seasonsWrapper'>
      <div className='formYear'>
        <select onChange={handleYearChange} value={selectedYear}>
          <option value="">Select a year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {Object.keys(resultsByRace).map(raceId => (
        <div key={raceId} className='raceResults'>
          <h3>Race ID: {raceId}</h3>
          <table>
            <thead>
              <tr>
                <th>POS</th>
                <th>DRIVER</th>
                <th>Constructor</th>
                <th>PTS</th>
              </tr>
            </thead>
            <tbody>
              {resultsByRace[raceId].map(result => (
                <tr key={result.resultsid}>
                  <td>{result.position}</td>
                  <td>{result.driver_name}</td>
                  <td>{result.constructor_name}</td>
                  <td>{result.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Seasons;