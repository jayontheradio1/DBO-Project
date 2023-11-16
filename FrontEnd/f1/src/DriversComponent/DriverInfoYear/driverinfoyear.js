import React, { useState, useEffect } from 'react';
import './seasons.css'

const DriverInfoYear = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [years, setYears] = useState(['2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023']); // Placeholder, you might want to fetch this from your API or define it statically

  useEffect(() => {
    if (selectedYear) {
      fetch(`http://localhost:5000/driver-performance-analysis/${selectedYear}`)
        .then(response => response.json())
        .then(data => {
          setDrivers(data);
          console.log('Drivers loaded:', data);
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
      <div>
        <h1>Consistent Drivers</h1>
         
         <div className = 'raceResults'>
            <table>
                <thead>
                    <tr>
                        <th>
                            Driver Name
                        </th>
                        <th>
                            Constructor Name
                        </th>
                        <th>
                            Circuit Location
                        </th>
                        <th>
                            Avg Points
                        </th>
                    </tr>
                </thead>

           {drivers.map((driver,index) => (
             <tr><td>
                {driver.driver}
                </td>
                <td>
                {driver.constructor}
                </td>
                <td>
                {driver.circuit_location}
                </td>
                <td>
                {driver.avg_points}
                </td>
            </tr>
           ))}
           </table>
         </div>
       </div> 
 
    </div>
  );
};

export default DriverInfoYear;