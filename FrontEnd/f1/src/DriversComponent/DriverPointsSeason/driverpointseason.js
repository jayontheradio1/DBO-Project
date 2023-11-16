import { useState, useEffect } from "react";
import './rollup.css'

function DriverPointSeason() {
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
      // Replace '/api/drivers' with your Flask API endpoint
      fetch('http://localhost:5000/driver-points-over-season')
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

    return(
        <div>
        <h1>Consistent Drivers</h1>
         
         <div className = 'raceResults'>
            <table>
                <thead>
                    <tr>
                        <th>
                            Driver ID
                        </th>
                        <th>
                            Driver Name
                        </th>
                        <th>
                            Points
                        </th>
                        <th>
                            Race ID
                        </th>
                        <th>
                            Running Total
                        </th>
                        <th>
                            Year
                        </th>
                    </tr>
                </thead>

           {drivers.map((driver,index) => (
             <tr><td>
                {driver.driver_id}
                </td>
                <td>
                {driver.driver_name}
                </td>
                <td>
                {driver.points}
                </td>
                <td>
                {driver.race_id}
                </td>
                <td>
                {driver.running_total}
                </td>
                <td>
                {driver.year}
                </td>
            </tr>
           ))}
           </table>
         </div>
       </div>     
    );
}

export default DriverPointSeason;