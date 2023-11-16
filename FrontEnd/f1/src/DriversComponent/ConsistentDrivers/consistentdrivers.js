import { useState, useEffect } from "react";
import './rollup.css'

function ConsistentDrivers() {
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
      // Replace '/api/drivers' with your Flask API endpoint
      fetch('http://localhost:5000/consistent-drivers')
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
                            Driver Name
                        </th>
                        <th>
                            Finishing Position Variance
                        </th>
                    </tr>
                </thead>

           {drivers.map((driver,index) => (
             <tr><td>
                {driver.Driver_Name}
                </td>
                <td>
                {driver.Finishing_Position_Variance}
                </td>
            </tr>
           ))}
           </table>
         </div>
       </div>     
    );
}

export default ConsistentDrivers;