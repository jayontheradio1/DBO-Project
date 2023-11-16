import { useState, useEffect } from "react";
import './rollup.css'

function Rollup() {
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
      // Replace '/api/drivers' with your Flask API endpoint
      fetch('http://localhost:5000/driver-constructor-performance')
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
        <h1>Drivers</h1>
         
         <div className = 'raceResults'>
            <table>
                <thead>
                    <tr>
                        <th>
                            Constructor Name
                        </th>
                        <th>
                            Driver Nationality
                        </th>
                        <th>
                            Total Drivers
                        </th>
                        <th>
                            Total Points
                        </th>
                        <th>
                            Total Wins
                        </th>
                    </tr>
                </thead>

           {drivers.map((driver,index) => (
             <tr><td>
                {driver.Constructor_Name}
                </td>
                <td>
                {driver.Driver_Nationality}
                </td>
                <td>
                {driver.Total_Drivers}
                </td>
                <td>
                {driver.Total_Points}
                </td>
                <td>
                {driver.Total_Wins}
                </td>
            </tr>
           ))}
           </table>
         </div>
       </div>     
    );
}

export default Rollup;