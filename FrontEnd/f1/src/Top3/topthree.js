import React, { useState } from 'react';

const TopThree = () => {
  const [driverName, setDriverName] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!driverName) {
      alert('Please enter a driver name.');
      return;
    }
    
    setLoading(true);
    setError('');

    if (driverName) {
        fetch(`http://localhost:5000/top-finishes/${driverName}`)
          .then(response => response.json())
          .then(data => {
            setDrivers(data);
            console.log('Drivers loaded:', data);
          });
      }

    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={driverName}
        onChange={(e) => setDriverName(e.target.value)}
        placeholder="Enter driver name"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>

      {error && <p className="error">{error}</p>}
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
                            Date
                        </th>
                        <th>
                            RaceID
                        </th>
                        <th>
                            Year
                        </th>
                    </tr>
                </thead>

           {drivers.map((driver,index) => (
             <tr><td>
             {driverName}
             </td>
                <td>
                {driver.date}
                </td>
                <td>
                {driver.raceid}
                </td>
                <td>
                {driver.year}
                </td>
            </tr>
           ))}
           </table>
         </div>
       </div> 
     
    </div>
  );
};

export default TopThree;